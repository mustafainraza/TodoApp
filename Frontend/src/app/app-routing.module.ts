import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { 
    path: 'tags',
    loadChildren: () => import('./tags/tag-routes').then((mod)=> mod.TAG_ROUTES)
  },
  { 
    path: 'task',
    loadChildren: () => import('./shared/edit-task/edit-task-routes').then((mod)=> mod.EDIT_TASK_ROUTES)
  },
  { path: '**', redirectTo:'', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
