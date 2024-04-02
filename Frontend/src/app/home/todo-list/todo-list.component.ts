import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/Task.model';
import { TodoListService } from '../../service/todo-list.service';
import { map, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../model/ApiResponse.model';
import { ElementaryTaskDTO } from '../../model/ElementaryTaskDTO.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  tasks: ElementaryTaskDTO[] = [];
  filteredTask:ElementaryTaskDTO[]=[];  
  routeId!:number;
  selectedTask:boolean=false;
  userId:number=1;
  isError: boolean = false;
  error: any;
  private subscriptions: Subscription[]=[];

  constructor(private router:Router ,private toDoListService: TodoListService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.push(
      this.toDoListService.getAllTasks().pipe(map((apiResponse: ApiResponse)=>apiResponse.response)).subscribe({
        next: (tasks: Task[])=>{
          this.isError = false;
          this.tasks = tasks;
        },
        error: error=>{
          this.isError = true;
          this.error = error;
        }
      })
    );    
  }

  deleteTask(id:number) {    
    this.toDoListService.deleteTask(+id);
    this.filteredTask = this.toDoListService.tasks.filter(task=>(task.parentId === +this.routeId)); 
    this.tasks = [...this.filteredTask];    
  }

  searchquery(query:string) {
  }
  viewTask(id: number){
    this.router.navigate(["/" + id]);
  }
  addNewTask(){
    this.router.navigate(["/create"]);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }
}
