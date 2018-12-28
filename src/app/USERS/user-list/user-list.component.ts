import { Component, OnInit } from '@angular/core';
import { UserService } from '../../SERVICES/user.service';
import { AuthService } from '../../SERVICES/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users=[];
  public loggedUser;

  constructor(
    private userService:UserService,
    private authService:AuthService,
  ) {}

   ngOnInit() {
    this.users= this.userService.getUsers();
    // Gets logged User
    this.loggedUser=this.authService.getLoggedUser();
  }

  eraseUser(index){
    if(window.confirm("Are you sure you want to erase this user ?")){
      this.userService.eraseUser(index);
    }
  }

}
