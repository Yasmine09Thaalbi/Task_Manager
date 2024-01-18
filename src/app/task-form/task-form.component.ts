import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit() {
    // Emit the task to the parent component
    this.taskSubmitted.emit(this.task);
    this.router.navigate(['/home']);
  }

  onFileChange(event: any) {
    // Handle file changes and update the attachments property
    const files: FileList = event.target.files;
    this.task.attachments = Array.from(files);
  }


}
