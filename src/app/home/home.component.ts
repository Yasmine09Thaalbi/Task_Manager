import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = '';
  boards = [
    { Name: "Backlog", Type: "red", tasks: [] },
    { Name: "In progress", Type: "yellow", tasks: [] },
    { Name: "Review", Type: "green", tasks: [] },
    { Name: "Done", Type: "blue", tasks: [] },
  ]; 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const username = params['username'];
      this.username = username;
      this.fetchTasks();
    });
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe(
      (tasks: any) => {
        this.boards = this.processTasks(tasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  processTasks(tasks: any[]): any[] {
    const processedBoards = [];
  
    const groupedTasks = tasks.reduce((groups, task) => {
      const status = task.status || 'Backlog';
  
      if (!groups[status]) {
        groups[status] = [];
      }
      groups[status].push(task);
  
      return groups;
    }, {});
  
    for (const status in groupedTasks) {
      if (groupedTasks.hasOwnProperty(status)) {
        let type = 'yellow'; 
  
        switch (status) {
          case 'Done':
            type = 'blue';
            break;
          case 'Review':
            type = 'green';
            break;
          case 'In progress':
            type = 'yellow';
            break;
          case 'Backlog':
            type = 'red';
            break;
          default:
            break;
        }
  
        const board = {
          Name: status,
          Number: groupedTasks[status].length,
          Type: type,
          tasks: groupedTasks[status]
        };
  
        processedBoards.push(board);
      }
    }
  
    return processedBoards;
  }

  addDefaultTask() {
    this.router.navigate(['/task-form']);
  }

}
