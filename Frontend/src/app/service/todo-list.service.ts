import { Injectable } from '@angular/core';
import { Task } from '../model/Task.model';
import { Subject } from 'rxjs';
import { TaskDTO } from '../model/TaskDTO';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor() { }

  private _tasks: Task[] = [
    new Task('Complete Angular project', 'Finish the Angular project with all required features', ['tag1', 'tag2'], 0, 1),
    new Task('Prepare presentation slides', 'Create slides for the upcoming presentation', ['tag2', 'tag2'], 0, 2),
    new Task('Call mom', 'Call mom to check in and chat for a while', ['tag3', 'tag2'], 9, 3),
    new Task('Buy groceries', 'Go to the supermarket and buy essential groceries', ['tag4', 'tag2'], 8, 4),
    new Task('Buy groceries', 'Go to the supermarket and buy essential groceries', ['tag4', 'tag2'], 6, 5),
    new Task('Buy groceries', 'Go to the supermarket and buy essential groceries', ['tag4', 'tag2'], 0, 6),
    new Task('Buy groceries', 'Go to the supermarket and buy essential groceries', ['tag4', 'tag2'], 0, 7),
    new Task('Buy groceries', 'Go to the supermarket and buy essential groceries', ['tag4', 'tag2'], 0, 8),
    new Task('Buy groceries', 'Go to the supermarket and buy essential groceries', ['tag4', 'tag2'], 0, 9)
  ];

  tasksSubject = new Subject<Task[]>();

  public get tasks(): Task[] {
    return this._tasks;
  }
  public set tasks(value: Task[]) {
    this._tasks = value;
  }

  public getSelectedById(id:number):Task {
    return this._tasks[id-1];
  }
  
  deleteTask(id: number) {
    this._tasks = this._tasks.filter(task => (task.id !== id || task.parentId !== id));
    this.tasksSubject.next([...this._tasks]);
  }

  public getTaskById(id: number): TaskDTO{
    return {task: this._tasks[0], subTasks: [this._tasks[1], this._tasks[2]]};
  }
  public saveTask(task: TaskDTO){
    
  }
}
