 
export class Task {
    private _id: number;
    private _title: string;
    private _description: string;
    private _parentId: number;
 
    private _temp_tags: string[] = [];
 
    public get temp_tags(): string[] {
        return this._temp_tags;
    }
    public set temp_tags(value: string[]) {
        this._temp_tags = value;
    }
 
    constructor(title: string, description: string, temp_tags:string[], parentId:number, id: number) {
        this._title = title;
        this._description = description;
        this.temp_tags = temp_tags;
        this._parentId = parentId;
        this._id = id;
    }  
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
   
    public get parentId(): number {
        return this._parentId;
    }
    public set parentId(value: number) {
        this._parentId = value;
    }  
}