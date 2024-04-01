import { Injectable } from '@angular/core';
import { Task } from '../model/Task.model';
import { Observable, Subject } from 'rxjs';
import { TaskDTO } from '../model/TaskDTO';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../model/ApiResponse.model';

@Injectable({
  providedIn: 'root'
})

export class TodoListService {

  serviceUrl: string = environment.BACKEND_URL + "task/";
  constructor(private http: HttpClient) { }

  private _tasks: Task[] = [];

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

  getTaskById(id: number): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.serviceUrl+id);
  }
  saveTask(task: TaskDTO): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.serviceUrl, task);
  }
  getAllTasks(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.serviceUrl);
  }
}

