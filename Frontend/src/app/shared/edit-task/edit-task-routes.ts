import { Route } from "@angular/router";
import { EditTaskComponent } from "./edit-task.component";
import { TaskResolver } from "../../resolvers/task-resolver.service";

export const EDIT_TASK_ROUTES: Route[] = [
    { path: 'create', component: EditTaskComponent },
    { path: 'edit/:id', component: EditTaskComponent, resolve: { taskApiResponse: TaskResolver } },
    { path: ':id', component: EditTaskComponent, resolve: { taskApiResponse: TaskResolver }},
]