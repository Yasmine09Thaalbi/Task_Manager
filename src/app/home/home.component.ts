import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  boards=[
    {Name : "Backlog" , Number: 7 , Type: "red" , tasks: [{ title: "Splash screen", description: "The book itself is surprisingly thin and it's not really a book perse it's a compilation." , Type : " green"}]},
    {Name : "In progress " , Number:2 ,Type: "yellow" , tasks: [{ title: "Develop Feature", description: "Description." , Type : "red" }] },
    {Name : "Review " , Number:3 , Type: "green" ,  tasks: []},
    {Name : "Done " , Number:42 , Type: "blue" ,  tasks: []},
  ]; 

  constructor() { }

  ngOnInit() {
  }

  addDefaultTask() {
    const defaultTask = { title: "Default Task", description: "This is a default task that can be modified later.", Type: "green" };
    this.boards[0].tasks.push(defaultTask); 
  }

}
