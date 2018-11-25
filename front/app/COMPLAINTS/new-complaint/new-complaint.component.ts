import { Component, OnInit } from '@angular/core';
import { ComplaintsService } from '../../SERVICES/complaints.service';
import { UserService } from '../../SERVICES/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../../CLASSES/user';
import { Complaint } from '../../CLASSES/complaint';
import { complaintMessage } from '../../CLASSES/complaintMessage';
import { AuthService } from '../../SERVICES/auth.service';

@Component({
  selector: 'app-new-complaint',
  templateUrl: './new-complaint.component.html',
  styleUrls: ['./new-complaint.component.css'],
})

//@NgModule.import { SelectModule } from "ng2-select";

export class NewComplaintComponent implements OnInit {

  constructor(
    private complaintService:ComplaintsService,
    private userService:UserService,
    private authService:AuthService,
  ) { }

  complaints=this.complaintService.getComplaints();
  public testNew=false;
  public loggedUser;
  public users;
  public selected=true;
  public newMessage=false;

  public complaint;
  public complaintTitle;
  public complaintTheme;
  public complaintRecipients;
  public complaintAuthor;
  public complaintMessages=[];
  public complaintDate;

  public potentialRecipients;
  public selectedRecipients;

  public themes=["Amour & Sexe","Travail","Santé", "Entourage", "Autre"];

  ngOnInit() {
    this.testNew=this.checkNew();
    this.users=this.userService.getUsers();
    this.loggedUser=this.authService.getLoggedUser();
    //this.potentialRecipients=this.getReceivers();

    this.complaint=this.getComplaint();
    if (this.complaint != ""){
      this.complaintTitle=this.complaint.title;
      this.complaintTheme=this.complaint.theme;
      this.complaintAuthor=this.complaint.author;
      this.complaintRecipients=this.complaint.recipients;
      this.complaintDate=this.complaint.messages.date;
      this.complaintMessages=this.complaint.messages;
    }
    else{
      this.complaintTitle="";
      this.complaintAuthor="";
      this.complaintAuthor=new User(
        "",
        "",
        "",
        "",
        "",
        this.users.length+1
      )
      this.complaintRecipients="";
      this.complaintDate=Date();
      this.complaintMessages[0]=new complaintMessage(
        "",
        Date(),
        this.complaintAuthor
      )
    }
  }
  
  /* Allows to hide/display the "new password" field depending on whether it is a new user or an existing one */
  //new="window.location.pathname==='/user/new' ? 'true':'false'";
  checkNew(){
    var response=false;
    if(window.location.pathname==="/complaints/new"){ response=true; }
    return response;
  }

  getComplaint(){
    var complaint;                                        // for existing complaint only
    if(!this.testNew){
      var index=window.location.pathname.substring(12);   // gets complaint id in URL
        return this.complaints[index];                    // gets complaint in complaints array
    }
    else{
      return "";
    }
  }

  getReceivers(){
    var localUsers=[];
    var j=0;
    var i=0;
    while(i<this.users.length){
      if(i===this.users.indexOf(this.loggedUser)){
        i++;
        localUsers[j]=this.users[i];
      }
      else{
        localUsers[j]=this.users[i];
      }
      i++;
      j++;
    }
    return localUsers;
  }

  addMessage(){
    this.newMessage=true;
  }

  changeClient(value){
    this.selectedRecipients=value;
  }

  onSubmit(f: NgForm){
    const formValue = f.form.value;
    const newComplaintMsg=new complaintMessage(
      formValue['complaintNewMessage'],
      Date(),
      this.loggedUser
    );
    if(this.testNew){
      const newComplaint=new Complaint(
        formValue['complaintTheme'],
        formValue['complaintTitle'],
        this.loggedUser,
        this.selectedRecipients,
        [newComplaintMsg],
        this.complaints.length,
        ""
      )
      this.complaintService.addComplaint(newComplaint);
    }
    else{
      this.complaintService.addMessage(newComplaintMsg, window.location.pathname.substring(12));
    }
  }
}



