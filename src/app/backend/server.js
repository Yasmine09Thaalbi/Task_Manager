const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');
const multer = require('multer');
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/projetweb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à MongoDB');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  due_date: Date,
  owner: String,
  priority: String,
  status: String,
  category: String,
  attachments: [String], 
});

const TaskModel = mongoose.model('Task', taskSchema);

app.post('/api/tasks' , cors(), upload.array('attachments', 5), async (req, res) => {
  console.log('Files:', req.files);
  try {
    const taskData = req.body;
    taskData.attachments = req.files.map(file => file.path);

    const newTask = new TaskModel(taskData);
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Error creating task', detailedError: error.message });
  }
});

app.get('/api/tasks', cors(), async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error fetching tasks', detailedError: error.message });
  }
});

app.delete('/api/tasks/:title', cors(), async (req, res) => {
  const taskTitle = req.params.title;
  console.log(taskTitle);
  try {
    const deletedTask = await TaskModel.findOneAndDelete({ title: taskTitle }); 
    console.log(deletedTask);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully', deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/tasks/:title', cors(), async (req, res) => {
  const taskTitle = req.params.title;
  const newStatus = req.body.status;

  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { title: taskTitle },
      { $set: { status: newStatus } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task status updated successfully', updatedTask });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.use(cors());
  

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  email: String,
});

const UserModel = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
    const formData = req.body;

    try {
      
      if (!formData.firstname || !formData.lastname || !formData.username || !formData.password || !formData.email) {
        throw new Error('Tous les champs doivent être renseignés.');
      }

      const newUser = new UserModel(formData);
      await newUser.save();
      console.log('Données d\'inscription enregistrées :', newUser);
      res.status(200).json({ status: 200, message: 'Inscription réussie !' });

    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des données d\'inscription :', error);
      res.status(500).json({ error: 'Erreur lors de l\'enregistrement des données d\'inscription.', detailedError: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      if (!username || !password) {
        throw new Error('Nom d\'utilisateur et mot de passe requis.');
      }
      const user = await UserModel.findOne({ username, password });
      if (user) {
        res.status(200).json({ status: 200, message: 'Connexion réussie !' });
      } else {
        res.status(401).json({ status: 401, error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      res.status(500).json({ status: 500, error: 'Erreur lors de la connexion.', detailedError: error.message });
    }
  });


  app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
  });
  