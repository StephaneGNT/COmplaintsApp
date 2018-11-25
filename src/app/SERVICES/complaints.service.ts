import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class ComplaintsService {

  constructor(
    private userService: UserService,
    private router:Router
  ){}

  complaints=[
    {
      theme: "Travail",
      title: "Ca me gooonfle",
      author: this.userService.users[1],
      recipients: [this.userService.users[0],this.userService.users[2]],
      messages:[
        {
          content:"Mon travail me casse toujours autant les couilles",
          date:'2018-07-20',
          author:this.userService.users[1],
        },
        {
          content:"Ah merde, qu'est ce qu'il se passe ?",
          date:'2018-07-20',
          author:this.userService.users[0],
        },
        {
          content:"Il se passe que rien n'a changé, c'est toujours autant le bordel...",
          date:'2018-07-21',
          author:this.userService.users[1],
        },
      ],
      id:0,
      status:"",
    },
    {
      theme: "Amour",
      title: "Je me sens seuuuuuuuuuuuuul",
      author: this.userService.users[2],
      recipients: [this.userService.users[1]],
      messages:[{
        content:"J'ai les couilles qui vont déborder",
        date:'2018-08-21',
        author: this.userService.users[2],
      }],
      id:1,
      status:"",
    },
  ];

  getComplaints(){
    return this.complaints;
  }

  addComplaint(newComplaint){
    this.complaints.push(newComplaint);
    this.router.navigate(['complaints'])
  }

  addMessage(newMessage, index){
    this.complaints[index].messages.push(newMessage);
    this.router.navigate(['complaints']);
  }

  eraseComplaint(index){
    this.complaints.splice(index,1);
  }
}
