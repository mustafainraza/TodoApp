import { NgModule } from '@angular/core';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ErrorComponent } from '../error/error.component';

@NgModule({
  imports: [ EditTaskComponent ],
  exports:[ EditTaskComponent ]
})
export class SharedModule { }
