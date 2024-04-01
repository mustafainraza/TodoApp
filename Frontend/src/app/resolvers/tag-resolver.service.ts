import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { TagService } from "../service/tag.service";
import { ApiResponse } from "../model/ApiResponse.model";
import { catchError, Observable, of } from "rxjs";


export const TagResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return inject(TagService).sendGetTagByIdRequest(+route.paramMap.get('id')!).pipe(catchError(error=>of({error: error})));
}
