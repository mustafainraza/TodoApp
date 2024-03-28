import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditTaskComponent } from './shared/edit-task/edit-task.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path: 'user', component:UserComponent},
  { path:':id', component:EditTaskComponent }, 
  { path: '**', redirectTo:'', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
