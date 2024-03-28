import { Component, Input, OnInit, inject } from '@angular/core';
import { TodoListService } from '../../../service/todo-list.service';
import { Task } from '../../../model/Task.model';

@Component({
  standalone:true,
  selector: 'app-todo-selected-list-item',
  templateUrl: './todo-selected-list-item.component.html',
  styleUrls: ['./todo-selected-list-item.component.css']
})
export class TodoSelectedListItemComponent implements OnInit {

  @Input('task_id') taskId!:number;
  task!:Task | undefined;
  private todoListService:TodoListService

  constructor() {
    this.todoListService = inject(TodoListService);
   }

  ngOnInit() {
    console.log('hello');
    this.task = this.todoListService.getSelectedById(+this.taskId);
  }

}
