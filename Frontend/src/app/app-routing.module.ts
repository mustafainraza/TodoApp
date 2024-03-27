import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditTaskComponent } from './shared/edit-task/edit-task.component';
import { TaskResolver } from './resolvers/task-resolver.service';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path: 'edit', redirectTo: '', pathMatch: 'full'},
  { path:'edit/:id', component:EditTaskComponent, resolve: {task: TaskResolver} },
  { path: ':id', component: HomeComponent},
  { path: 'create', component: EditTaskComponent },  
  { path: '**', redirectTo:'', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
