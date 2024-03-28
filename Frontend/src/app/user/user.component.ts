import { Component,OnInit } from '@angular/core';
import { User } from '../model/User.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent implements OnInit {

  user!: User | undefined;

  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    const userId = 1;
    //this.user=this.userService.getUsers();
    //this.user = this.userService.getUserById(userId);
   console.log(this.userService.getUserById(userId))
   this.user=this.userService.getUserById(userId);
  }
}