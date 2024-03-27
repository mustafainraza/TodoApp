import { Injectable } from '@angular/core';
import { Task } from '../model/Task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor() { }

  private _tasks: Task[] = [
    new Task('Complete Angular project', 'Finish the Angular project with all required features', ['tag1','tag2'], 0),
    new Task('Prepare presentation slides', 'Create slides for the upcoming presentation',  ['tag2','tag2'], 1),
    new Task('Call mom', 'Call mom to check in and chat for a while',  ['tag3','tag2'], 1),
    new Task('Buy groceries', 'Go to the supermarket and buy essential groceries',  ['tag4','tag2'], 0)
  ];

  tasksSubject = new Subject<Task[]>();

  public get tasks(): Task[] {
    return this._tasks;
  }
  public set tasks(value: Task[]) {
    this._tasks = value;
  }

  deleteTask(id: number) {
    this._tasks = this._tasks.filter(task=> task.id!== id);
    this.tasksSubject.next([...this._tasks]);
  }

}
