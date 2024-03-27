import { Component, OnInit } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({

  standalone:true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[
     TodoListComponent,     
  ]
  
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
