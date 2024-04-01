import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { TagService } from "../service/tag.service";
import { Tag } from "../model/Tag";


export const TagResolver: ResolveFn<Tag> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return inject(TagService).getTagById(+route.paramMap.get('id')!);
}
