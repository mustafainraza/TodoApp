import { NgModule } from '@angular/core';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [EditTaskComponent],
  exports:[EditTaskComponent]
})
export class SharedModule { }
