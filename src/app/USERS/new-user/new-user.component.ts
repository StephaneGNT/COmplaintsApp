import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../SERVICES/user.service';
import { MessageService } from '../../SERVICES/message.service';
import { AuthService } from '../../SERVICES/auth.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(
    private userService:UserService,
    private authService:AuthService,
    private messageService:MessageService,
  ) { }

  users=this.userService.getUsers();
  public testNew=false;
  public existingEmail=false;
  public modify=false;

  public firstNamePlaceHolder;
  public lastNamePlaceHolder;
  public emailPlaceHolder;
  public firstNameNgModel;
  public lastNameNgModel;
  public emailNgModel;

  ngOnInit() {
    this.testNew=this.checkNew();
    this.firstNamePlaceHolder=this.getPlaceHolder(0);
    this.lastNamePlaceHolder=this.getPlaceHolder(1);
    this.emailPlaceHolder=this.getPlaceHolder(2);

    this.firstNameNgModel=this.getNgModel(0);
    this.lastNameNgModel=this.getNgModel(1);
    this.emailNgModel=this.getNgModel(2);
  }
  
  /* Allows to hide/display the "new password" field depending on whether it is a new user or an existing one */
  checkNew(){
    var response=false;
    if(window.location.pathname==="/users/new"){ response=true; }
    return response;
  }

  /* Changes the input placeholder or prefill the inputs depending on whether it is a new user or an existing one
     Parameter of getPlaceHolder/getNgModel function allows to have a single function for first name, last name and email */

  //firstNamePlaceHolder=this.getPlaceHolder(0);

  getPlaceHolder(i){  // for new user only
    if(this.testNew){
      switch(i){
        case 0 : return 'First name';
        case 1 : return 'Last name';
        case 2 : return 'Email';
      }
    }
  }

  getNgModel(i){    // for existing user only
    if(!this.testNew){
      var index=window.location.pathname.substring(7);  // gets userId in URL
      switch(i){
        case 0 : return this.users[index].firstName;    // gets user first name in users array
        case 1 : return this.users[index].lastName;     // gets user last name in users array
        case 2 : return this.users[index].email;        // gets user email in users array
      }
    }
  }

  /* Allows to hide/display the change password button and actual password field unless user want to change it */
  modifyPwd(){
    event.preventDefault();
    return this.modify=true;
  }

  /* On submit, use checkForm to validate the different input : if okay, add user or update user ; if not, prevent default and display error messages */
  onSubmit(f: NgForm){
    event.preventDefault();
    var checkedForm=this.checkForm(f.form.value);         // true or false depending on form validation
    var newUser=f.form.value;                            // form input informations, used to create/update user
    if(checkedForm){
      if(this.testNew){                                   // if form validated + new user
        this.userService.addUser(newUser);
      }
      else{                                               // if form validated + existing user
        var index=window.location.pathname.substring(7);  // gets userId in URL
        this.userService.updateUser(newUser, index);
      }
    }
  }

  checkForm(userInfo){
    var localCheckForm=true;

    // Check consistency between new password and old password (if existing)
    if(userInfo.userNewPwd && userInfo.userNewPwdConfirm && userInfo.userNewPwd !== userInfo.userNewPwdConfirm){
      this.messageService.openSnackBar("Both passwords must be identical","fail");
      localCheckForm=false;
    }
    // Check password acceptability
    if(userInfo.userNewPwd!="" && !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(userInfo.userNewPwd))){
      this.messageService.openSnackBar("Password must contain at least 8 characters, including a majuscule, a minuscule and a figure.","fail");
      localCheckForm=false;
    }
    // Check email acceptability
    if(!(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/.test(userInfo.userEmail))){
      this.messageService.openSnackBar("Wrong email format","fail");
      localCheckForm=false;
    }
    // Check existing email for new user only
    if(this.testNew) {
      this.existingEmail=this.checkMail(userInfo.userEmail);
      if(this.existingEmail){ 
        this.messageService.openSnackBar("This email already exists","fail");
        localCheckForm=false; 
      }
    }
    // Check consistency between pwd and userID
    else if(!this.authService.checkUserInfo(userInfo.userEmail,userInfo.userExistingPwd)) {
      this.messageService.openSnackBar("Wrong userID and/or password","fail");
      localCheckForm=false;
    }
    
    return localCheckForm;
    
  }

  /* Check if email is already existing */
  checkMail(givenEmail){
    var response=false;
    for(var i=0;i<this.users.length;i++){
      if(this.users[i].email==givenEmail){
        response=true;
        break;
      }
    }
    return response;
  }


}
