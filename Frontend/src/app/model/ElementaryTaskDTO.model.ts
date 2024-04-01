import { Tag } from "./Tag.model";

export interface ElementaryTaskDTO{
    id: number,
    title: string,
    description: string,
    tags: Tag[]
}