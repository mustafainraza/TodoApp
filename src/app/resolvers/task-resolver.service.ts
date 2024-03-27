import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { TodoListService } from "../service/todo-list.service";
import { inject } from "@angular/core";
import { TaskDTO } from "../model/TaskDTO";


export const TaskResolver: ResolveFn<TaskDTO> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return inject(TodoListService).getTaskById(+route.paramMap.get('id')!);
}
