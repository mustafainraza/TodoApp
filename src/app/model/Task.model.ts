import { Tag } from "./Tag";

export class Task {
    private static _idGenerator = 1;
    private static _staticTags: Tag[];

    private _id: number;
    private _title: string;
    private _description: string;
    private _tags: number[] = [];
    private _parentId: number;
  
    private _temp_tags: string[] = [];

    public get temp_tags(): string[] {
        return this._temp_tags;
    }
    public set temp_tags(value: string[]) {
        this._temp_tags = value;
    }

    constructor(title: string, description: string, temp_tags:string[], parentId:number) {
        this._title = title;
        this._description = description;
        this._id = Task._idGenerator;
        this.temp_tags = temp_tags;
        this._parentId = parentId;
        Task._idGenerator++;
    }   

    // constructor(title: string, description: string) {
    //     this._title = title;
    //     this._description = description;
    //     this._id = Task._idGenerator;
    //     Task._idGenerator++;
    // }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get tags(): Tag[] {
        return this._tags.map(index => Task._staticTags[index]);
    }
    public get parentId(): number {
        return this._parentId;
    }
    public set parentId(value: number) {
        this._parentId = value;
    }

    public addTag(name: string): boolean {
        if (Task._staticTags.map(tag => tag.value).indexOf(name) === -1) {
            Task._staticTags.push({ value: name, inUse: 0 });
            return true;
        }
        return false;
    }
    public deleteTag(name: string): boolean {
        const index: number = Task._staticTags.map(tag => tag.value).indexOf(name);
        if (index !== -1) {
            if (Task._staticTags[index].inUse > 0) return false;
            Task._staticTags.splice(index, 1);
            return true;
        }
        return false;
    }
    public editTag(name: string, newName: string): boolean {
        const index: number = Task._staticTags.map(tag => tag.value).indexOf(name);
        if (index !== -1) {
            Task._staticTags[index].value = newName;
            return true;
        }
        return false;
    }
    public assignTag(tag: Tag): boolean {
        const index: number = Task._staticTags.map(tag => tag.value).indexOf(tag.value);
        if (index !== -1) {
            if (this._tags.indexOf(index) === -1) {
                this._tags.push(index);
                Task._staticTags[index].inUse += 1;
                return true;
            }
            return false;
        }
        return false;
    }
    public takeAwayTag(tag: Tag): boolean {
        const index: number = Task._staticTags.map(tag => tag.value).indexOf(tag.value);
        if (index !== -1) {
            const indexArrayIndex: number = this._tags.indexOf(index);
            if (indexArrayIndex !== -1) {
                this._tags.splice(indexArrayIndex, 1);
                Task._staticTags[index].inUse -= 1;
                return true;
            }
            return false;
        }
        return false;
    }
}