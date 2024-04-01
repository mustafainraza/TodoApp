import { Injectable } from '@angular/core';
import { Tag } from '../model/Tag';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../model/ApiResponse.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
 
   constructor(private httpClient: HttpClient) { }

  private _tags: Tag[] = [ ];

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

  sendGetTagByIdRequest(id: number){
    return this.httpClient.get<ApiResponse>(environment.BACKEND_URL+"tag/"+id)
  }
  sendSaveTagRequest(tag: Tag){
    return this.httpClient.post<ApiResponse>(environment.BACKEND_URL+"tag/save", tag)
  }
  sendGetAllTagsRequest(){
    return this.httpClient.get<ApiResponse>(environment.BACKEND_URL+"tag/all")

  }
  sendDeleteTagRequest(id: number){
    return this.httpClient.delete<ApiResponse>(environment.BACKEND_URL+"tag/"+id)
  }

}
