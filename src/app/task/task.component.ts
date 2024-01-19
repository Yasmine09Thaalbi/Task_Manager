import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDetailService } from '../services/task-detail.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() TaskInput: any;

  constructor(private router: Router , private taskDetailService: TaskDetailService) {}

  ngOnInit() {
  }

  navigateToTaskDetails(){
    this.taskDetailService.setTask(this.TaskInput);
    this.router.navigate(['/task-details']);
  }
}
