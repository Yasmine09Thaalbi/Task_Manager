import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = '';
  boards=[
    {Name : "Backlog" , Number: 7 , Type: "red" , tasks: [{ title: "Splash screen", description: "The book itself is surprisingly thin and it's not really a book perse it's a compilation." , due_date:null, Priority : "Low" , owner:"Mohamed" , Category:"Design"}]},
    {Name : "In progress " , Number:2 ,Type: "yellow" , tasks: [{ title: "Develop Feature", description: "Description." ,due_date:null,  Priority : "Urgent",  owner:"Mohamed", Category:"Design" }] },
    {Name : "Review " , Number:3 , Type: "green" ,  tasks: []},
    {Name : "Done " , Number:42 , Type: "blue" ,  tasks: []},
  ]; 

  constructor(private router: Router,private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const username = params['username'];
      this.username = username;
    });
  }

  addDefaultTask() {
      this.router.navigate(['/task-form']);
  }

  addTaskToBacklog(newTask: any) {
    // Add the new task to the 'Backlog' board
    this.boards[0].tasks.push(newTask);
  }

}
