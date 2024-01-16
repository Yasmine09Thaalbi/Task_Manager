const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/projetweb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à MongoDB');
});

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
  }));
  

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
  
      // Votre logique d'authentification ici (par exemple, vérification dans la base de données)
      const user = await UserModel.findOne({ username, password });
      
      if (user) {
        // Utilisateur trouvé, renvoyer une réponse réussie
        res.status(200).json({ status: 200, message: 'Connexion réussie !' });
      } else {
        // Utilisateur non trouvé, renvoyer une réponse d'échec
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
  