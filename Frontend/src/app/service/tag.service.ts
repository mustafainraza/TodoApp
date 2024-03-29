import { Injectable } from '@angular/core';
import { Tag } from '../model/Tag';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
 
   constructor() { }

  private _tags: Tag[] = [
    { id: 1, name: 'active' },
    { id: 2, name: 'deactivate' },
    { id: 3, name: 'pending' }
  ];

  tagSubject = new Subject<Tag[]>();

  public get tags(): Tag[] {
    return this._tags;
  }
  public set tags(value: Tag[]) {
    this._tags = value;
  }

  deleteTag(id: number) {
     this._tags = this._tags.filter(tag => tag.id !== id)
     this.tagSubject.next(this._tags);
  }

  getTagById(id: number): Tag {
    console.log(id);
   return this._tags.filter(tag => tag.id === id)[0];    
 }

 saveTask(tag: Tag) {
    
 }

}
