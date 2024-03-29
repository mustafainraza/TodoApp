import { Component, Input, OnInit, inject } from '@angular/core';
import { TodoListService } from '../../../service/todo-list.service';
import { Task } from '../../../model/Task.model';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-todo-selected-list-item',
  templateUrl: './todo-selected-list-item.component.html',
  styleUrls: ['./todo-selected-list-item.component.css'],
  imports: [ RouterModule]
  
})
export class TodoSelectedListItemComponent implements OnInit {

  @Input('task_id') taskId!:number;
  task!:Task | undefined;
  private todoListService:TodoListService

  constructor() {
    this.todoListService = inject(TodoListService);
   }

  ngOnInit() {
    this.task = this.todoListService.getSelectedById(+this.taskId);
  }

}
