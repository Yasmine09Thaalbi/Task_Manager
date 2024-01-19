import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailService {
  private taskSource = new BehaviorSubject<any>(null);
  currentTask = this.taskSource.asObservable();

  constructor() {}

  setTask(task: any) {
    this.taskSource.next(task);
  }
}
