import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { Location } from '@angular/common';
import { TaskDetailService } from '../services/task-detail.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})

export class TaskDetailsComponent implements OnInit {
  task: any | null = null; 
  newStatus:any;

  constructor( private http: HttpClient, private location: Location , private taskDetailService: TaskDetailService) {}

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.taskDetailService.currentTask.subscribe(task => {
      this.task = task;
      console.log('Initial task status:', this.task.status);
      console.log('Task:', this.task);
    });
  }
  deleteTask() {
    if (!this.task) {
      return;
    }
  
    const taskTitle = this.task.title;
    console.log('Deleting task with title:', taskTitle);
  
    this.http.delete(`http://localhost:3000/api/tasks/${taskTitle}`).subscribe(
      () => {
        console.log('Task deleted successfully.');
        this.location.back();
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  changeStatus() {
    console.log('Changing status to:', this.newStatus);
    if (!this.task || !this.newStatus) {
      return;
    }

    console.log('Changing status to:', this.newStatus);
    this.task.status = this.newStatus;
    console.log(this.task.status);
    const taskTitle = this.task.title;
    this.http.put(`http://localhost:3000/api/tasks/${taskTitle}`, { status: this.newStatus }).subscribe(
      () => {
        console.log('Status updated successfully.');
        this.location.back();
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }
  
  
  
}
