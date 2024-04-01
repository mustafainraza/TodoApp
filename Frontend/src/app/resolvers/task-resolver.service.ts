import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { TodoListService } from "../service/todo-list.service";
import { inject } from "@angular/core";
import { catchError, of } from "rxjs";


export const TaskResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return inject(TodoListService).getTaskById(+route.paramMap.get('id')!).pipe(catchError(error=>of({error: error})));
}
