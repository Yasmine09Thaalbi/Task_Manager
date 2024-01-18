import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})

export class TaskDetailsComponent implements OnInit {
  task: any | null = null; // Task object received from the route state

  constructor(private route: ActivatedRoute, private location: Location) {}

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    // Get the task object from the route state
    this.route.queryParams.subscribe(params => {
      if (params && params['task']) {
        this.task = params['task'];
        console.log('Task:', this.task);
        // Display task details based on this.task
        // You may need to adjust the code based on your task data structure
      }
    });
  }
}
