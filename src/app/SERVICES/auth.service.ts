import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
){}

    isAuth = false;
    loggedUser={};

    signIn(givenEmail, givenPwd) {
        // if(this.checkUserInfo(givenEmail, givenPwd)){
            this.isAuth=true;
            this.loggedUser=this.implementLoggedUser(givenEmail);
            this.messageService.openSnackBar("Logged in successfully","success");
            this.router.navigate(['complaints']);
        // }
        // else{
        //     this.messageService.openSnackBar("Wrong ID and/or password","fail");
        // }
        
    }

    signOut() {
        this.isAuth = false;
        this.router.navigate(['']);
    }

    checkUserInfo(givenEmail, givenPwd){
        var checked = false;
        for(var i = 0; i < this.userService.users.length; i++) {        // browses the array
            if (this.userService.users[i].email === givenEmail) {       // if email found
                if(this.userService.users[i].password === givenPwd){    // if password ok
                checked = true;
                break;
                }
            }
        }
        return checked;
    }

    implementLoggedUser(userEmail){
        if(userEmail==""){
          this.loggedUser="";
        }
        else{
          for(var i = 0; i < this.userService.users.length; i++) {        // browses the array
            if (this.userService.users[i].email === userEmail) {          // if email found
              this.loggedUser=this.userService.users[i];
              break;
            }
          }
        }
        return this.loggedUser;
    }
      
    getLoggedUser(){
        return this.loggedUser;
    }
}

