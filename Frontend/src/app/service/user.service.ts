import { Injectable } from '@angular/core';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
  { _userId:1,userName:'Mustafain',email:'mustafain656@gmail.com',age:21,userImg:'data:image/jpeg;base64,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' }
  ];

  constructor() { }

  getUsers():User[]{
    return this.users;
  }

  getUserById(userId: number): User | undefined {
    return this.users.find(user => user._userId === userId);
  }
}
