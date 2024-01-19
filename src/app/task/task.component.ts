import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() TaskInput: any;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  navigateToTaskDetails(){
  this.router.navigate(['/task-details'], { queryParams: { task: this.TaskInput } });
  }
}
