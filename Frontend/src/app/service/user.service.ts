import { Injectable } from '@angular/core';
import { User } from '../model/User.model';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../model/ApiResponse.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serviceUrl: string = environment.BACKEND_URL + "api/user/";

  constructor(private httpClient:HttpClient) { }

  // getUsers():User[]{
  //   return this.users;
  // }

  getUserById(userId: number) {
    console.log(this.serviceUrl+userId);
    return this.httpClient.get<ApiResponse>(this.serviceUrl+userId);
  }
}
