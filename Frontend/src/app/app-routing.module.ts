import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditTaskComponent } from './shared/edit-task/edit-task.component';
import { UserComponent } from './user/user.component';
import { TagsComponent } from './tags/tags.component';
import { EditTagComponent } from './tags/edit-tag/edit-tag.component';
import { TagResolver } from './resolvers/tag-resolver.service'

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path: 'user', component:UserComponent, pathMatch:'full'},  
  { path: 'tags', component:TagsComponent },
  { path: 'tags/create', component:EditTagComponent},
  { path: 'tags/edit/:id', component:EditTagComponent, resolve:{tag: TagResolver}},
  { path: 'create', component: EditTaskComponent },  
  { path: 'edit', redirectTo: '', pathMatch: 'full'},
  { path: 'edit/:id', component:EditTaskComponent },
  { path: ':id', component: HomeComponent},  
  { path: '**', redirectTo:'', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
