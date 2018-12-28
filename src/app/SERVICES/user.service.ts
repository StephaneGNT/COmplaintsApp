import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../CLASSES/user';
import axios from 'axios';


@Injectable()
export class UserService {

  constructor(
    private router:Router,
  ) { }

  public loggedUser;

  users=[];


  async getUsers(){
    try {
      const response = await (axios.get('http://localhost:5000/users'));
      this.users = response.data;
      console.log(this.users)
      return this.users;
    } catch (e) {
      console.log(e);
    }
    // axios
    //   .get('http://localhost:5000/users')
    //   .then(response => {
    //     console.log(response.data[0]);
    //     this.users  = response.data[0];
    //   })
    // console.log("this.getUsers", this.users)
    // return this.users;
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
    // this.users.push(newUser);
    axios.post('http://localhost:5000/users/new',{
      body: newUser
    });
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
