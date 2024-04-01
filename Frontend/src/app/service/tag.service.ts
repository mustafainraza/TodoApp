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

  serviceUrl: string = "tag/";

  constructor(private httpClient: HttpClient) { }

  tagSubject = new Subject<Tag[]>();

  sendGetTagByIdRequest(id: number){
    return this.httpClient.get<ApiResponse>(environment.BACKEND_URL+this.serviceUrl+id)
  }
  sendSaveTagRequest(tag: Tag){
    return this.httpClient.post<ApiResponse>(environment.BACKEND_URL+this.serviceUrl, tag)
  }
  sendGetAllTagsRequest(){
    return this.httpClient.get<ApiResponse>(environment.BACKEND_URL+this.serviceUrl)
  }
  sendDeleteTagRequest(id: number){
    return this.httpClient.delete<ApiResponse>(environment.BACKEND_URL+this.serviceUrl+id)
  }

}
