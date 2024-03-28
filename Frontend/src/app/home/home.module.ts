import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';

@NgModule({
   imports: [
	 HomeComponent,CommonModule
	],
   exports: [
      HomeComponent
   ],
})
export class HomeModule { }
