import { Route } from "@angular/router";
import { EditTagComponent } from "./edit-tag/edit-tag.component";
import { TagResolver } from "../resolvers/tag-resolver.service";
import { TagsComponent } from "./tags.component";

export const TAG_ROUTES: Route[]=[
    { path: '', component: TagsComponent },
    { path: 'create',   component: EditTagComponent },
    { 
        path: 'edit/:id', component: EditTagComponent,
        resolve: { tagApiResponse: TagResolver}
    },
]