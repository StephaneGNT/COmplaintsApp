import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from '../../SERVICES/user.service';
import { AuthService } from '../../SERVICES/auth.service';
import { MessageService } from '../../SERVICES/message.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    public router:Router,
    public userService: UserService,
    public authService: AuthService,
    public messageService: MessageService,
  ) {}

  // Error msg is hidden by default
  isVisible=false;
  
  ngOnInit() {
  }

  onSubmit(form:NgForm){
    const userEmail = form.value['userEmail'];
    const userPwd = form.value['userPwd'];
    this.authService.signIn(userEmail, userPwd);
  }
}