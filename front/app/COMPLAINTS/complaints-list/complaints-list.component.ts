import { Component, OnInit } from '@angular/core';
import { ComplaintsService } from '../../SERVICES/complaints.service';
import { UserService } from '../../SERVICES/user.service';
import { AuthService } from '../../SERVICES/auth.service';
import { Complaint } from '../../CLASSES/complaint'

@Component({
  selector: 'app-complaints-list',
  templateUrl: './complaints-list.component.html',
  styleUrls: ['./complaints-list.component.css']
})

export class ComplaintsListComponent implements OnInit {

  constructor(
    public complaintService : ComplaintsService,
    public userService: UserService,
    public authService: AuthService,
  ) { }

  complaints = [];
  //complaints: Complaint[] = []; typage du contenu du tableau Complaints
  //shownComplaints=[];
  complaintStatus: string[] = [];
  loggedUser;
  displayStatus;

  ngOnInit(){
    // Gets logged User
    this.loggedUser=this.authService.getLoggedUser();
    // Gets complaints list
    this.complaints=this.complaintService.getComplaints();
    // For each complaint, determines its status (sent, received and eventually answered)
    this.getComplaintStatus();
    // Determines the display status (all, sent or received)
    this.displayStatus=this.getDisplayStatus();
  }

  // Allows to display if the complaint is sent or received and if it has been read
  getComplaintStatus(){
    var localUser=this.loggedUser;                  // for the logged user
    this.complaints.forEach(function(complaint){
      if(complaint.author === localUser){           // if the logged user is the complaint author
        if(complaint.messages.length === 1){        // and if it has not been answered
          complaint.status="Sent"
        }else{                                      // otherwise, if it's been answered
          complaint.status="Sent and answered"
        }
      }
      else{                                         // else = the logged user is (one of) the recipient(s)
        if(complaint.messages.length === 1){
          complaint.status="Received"
        }else{
          complaint.status="Received and answered"
        }
      }
    })
  }

  getDisplayStatus(){
    if(window.location.pathname==="/complaints"){ return "All" }
    else if(window.location.pathname==="/complaints/sent"){ return "Sent" }
    else if(window.location.pathname==="/complaints/received"){ return "Received" }
  }

  eraseComplaint(index){
    if(window.confirm("Are you sure you want to erase this complaint ?")){
      this.complaintService.eraseComplaint(index);
    }
  }
}
