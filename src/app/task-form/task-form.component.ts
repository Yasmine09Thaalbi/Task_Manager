import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export class TaskFormComponent {
  @Output() taskSubmitted = new EventEmitter<any>();
  task = {
    title: '',
    description: '',
    due_date: null,
    owner: '',
    priority: 'Low',
    status: 'Backlog',
    category: 'Design',
    attachments: [] as File[]
  };

  constructor(private taskService: TaskService,private location: Location) {}

  onSubmit() {
    const formData = new FormData();
  
    formData.append('title', this.task.title);
    formData.append('description', this.task.description);
    if (this.task.due_date !== null && this.task.due_date !== undefined) {
      formData.append('due_date', String(this.task.due_date));
    }
    formData.append('owner', this.task.owner);
    formData.append('priority', this.task.priority);
    formData.append('status', this.task.status);
    formData.append('category', this.task.category);
    for (let i = 0; i < this.task.attachments.length; i++) {
      formData.append('attachments', this.task.attachments[i]);
    }
  
    this.taskService.createTask(formData).subscribe(
      (response: any) => {
        console.log('Server response:', response);
        if (response && response.message) {
          // console.log('Tâche créée avec succès:', response.message);
          // this.taskSubmitted.emit(response.task); // Assuming task is returned in the response
          this.location.back();
        } else {
          console.error('Réponse serveur inattendue:', response);
        }
      },
      (error) => {
        console.error('Erreur lors de la création de la tâche:', error);
      }
    );
  }
  
  onFileChange(event: any) {
    const files: FileList = event.target.files;
    this.task.attachments = Array.from(files);
  }
}
