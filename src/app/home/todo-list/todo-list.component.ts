import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/Task.model';
import { TodoListService } from '../../service/todo-list.service'
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [CommonModule]
})
export class TodoListComponent implements OnInit {

  tasks!: Task[];
  filteredTask:Task[]=[];  

  private tasksSubscription!: Subscription;

  constructor(private router:Router ,private toDoListService: TodoListService) { 
    this.tasks = this.toDoListService.tasks;
    this.filteredTask = [...this.tasks];
  }

  ngOnInit() {        
    this.tasksSubscription = this.toDoListService.tasksSubject.subscribe(tasks => {
      this.filteredTask = tasks;
    });            
  }

  deleteTask(id:number) {    
    this.toDoListService.deleteTask(id);
    this.tasks = [...this.filteredTask];    
  }

  editTask(id: number) {
    this.router.navigate(['/', id]); 
  }

  searchquery(query:string) {
    if(!query) {
      this.filteredTask = [...this.tasks];
      return;
    }   
    this.filteredTask = this.tasks.filter(task=> 
        task.title.toLowerCase().includes(query.toLowerCase()) || 
        task.description.toLowerCase().includes(query.toLowerCase()) ||
        task.temp_tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )}

    enter(id:number) {
      alert(id);
    }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }
}
