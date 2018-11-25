import { Pipe, PipeTransform  } from '@angular/core';
import { User } from "../CLASSES/user";
import { Complaint } from "../CLASSES/complaint";

/* Pipes is used to display only the complaints loggedUser can see (i.e when he is sender or recipient), 
   or the chosen one (only the one sent, or only the one received) */
   @Pipe({
    name: 'complaintsFilter',
    pure: false
  })
  export class ComplaintsFilterPipe implements PipeTransform {
    transform(complaintsArray: [Complaint], loggedUser: User, status:String): Object[] {
      if(status==="All"){
          return complaintsArray.filter(complaint => ((complaint.author===loggedUser)||(complaint.recipients.indexOf(loggedUser)!=-1)));
      }
      else if(status==="Sent"){
          return complaintsArray.filter(complaint => (complaint.author===loggedUser));
      }
      else{
          return complaintsArray.filter(complaint => (complaint.recipients.indexOf(loggedUser)!=-1));
      }
    }
  }