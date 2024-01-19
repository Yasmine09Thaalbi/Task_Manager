import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})

export class TaskDetailsComponent implements OnInit {
  task: any | null = null; 

  constructor(private route: ActivatedRoute, private location: Location) {}

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      if (params && params['task']) {
        this.task = params['task'];
        console.log('Task:', this.task);
        
      }
    });
  }
}
