import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../CLASSES/user';


@Injectable()
export class UserService {

  constructor(
    private router:Router,
  ) { }

  public loggedUser;

  users=[
    {
      firstName: "Damien",
      lastName: "Dubois",
      role: "SimpleUser",
      password: "DamienDubois",
      email:"damien.dubois@gmail.com",
      id:0
    },
    {
      firstName: "Audrey",
      lastName: "Quintard",
      role: "SimpleUser",
      password: "AudreyQuintard",
      email:"audrey.quintard@gmail.com",
      id:1
    },
    {
      firstName: "Stéf",
      lastName: "Guinot",
      role: "Admin",
      password: "StephaneGuinot",
      email:"stephane.guinot@gmail.com",
      id:2
    }
  ];


  getUsers(){
    return this.users;
  }

  addUser(userInfo){
    const newUser=new User(
      userInfo.firstName,
      userInfo.lastName,
      "SimpleUser",
      userInfo.userNewPwd,
      userInfo.userEmail,
      this.users.length,
    );
    this.users.push(newUser);
    this.router.navigate(['users']);
  }

  updateUser(userInfo, index){
    if(this.users[index].firstName!=userInfo.firstName){
      this.users[index].firstName=userInfo.firstName;
    }
    if(this.users[index].lastName!=userInfo.lastName){
      this.users[index].lastName=userInfo.lastName;
    }
    if(this.users[index].email!=userInfo.userEmail){
      this.users[index].email=userInfo.userEmail;
    }
    if(this.users[index].password!=userInfo.userNewPwd && userInfo.userNewPwd!=''){
      this.users[index].password=userInfo.userNewPwd;
    }
    this.router.navigate(['users']);
  }

  eraseUser(index){
    this.users.splice(index,1);
  }
}
