import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/Task.model';
import { TodoListService } from '../../service/todo-list.service'
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TodoSelectedListItemComponent } from './todo-selected-list-item/todo-selected-list-item.component';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [CommonModule,RouterModule,TodoSelectedListItemComponent]
})
export class TodoListComponent implements OnInit {

  tasks!: Task[];
  filteredTask:Task[]=[];  
  routeId!:number;
  selectedTask:boolean=false;
  userId:number=1;

  private tasksSubscription!: Subscription;

  constructor(private router:Router ,private toDoListService: TodoListService, private activatedRoute:ActivatedRoute) {}

  ngOnInit() {        

    this.routeId = this.activatedRoute.snapshot.params['id'];
    if(!this.routeId) {      
      this.routeId = 0;
      this.selectedTask = false;
    } else {
      this.selectedTask = true;
    }        
    this.tasks = this.toDoListService.tasks.filter(task=>(task.parentId === +this.routeId));  
    this.tasks = this.tasks.filter(task => task.user_id === this.userId);    
    this.filteredTask = [...this.tasks];    
    this.tasksSubscription = this.toDoListService.tasksSubject.subscribe(tasks => {
      this.filteredTask = tasks;
    });            
  }

  deleteTask(id:number) {    
    this.toDoListService.deleteTask(+id);
    this.filteredTask = this.toDoListService.tasks.filter(task=>(task.parentId === +this.routeId)); 
    this.tasks = [...this.filteredTask];    
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
    viewTask(id: number){
      this.router.navigate(["/" + id]);
    }
    addNewTask(){
      this.router.navigate(["/create"]);
    }
    ngOnDestroy() {
      this.tasksSubscription.unsubscribe();
    }
}
