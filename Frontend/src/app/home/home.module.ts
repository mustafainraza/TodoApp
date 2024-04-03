import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ErrorComponent } from '../error/error.component';
import { TodoSelectedListItemComponent } from './todo-list/todo-selected-list-item/todo-selected-list-item.component';

@NgModule({
   declarations: [
      HomeComponent,
      TodoListComponent,
      TodoSelectedListItemComponent,  
   ],
   imports: [ 
      CommonModule,
      RouterModule,
      ErrorComponent 
   ],
   exports:[ ErrorComponent ]
})
export class HomeModule { }
