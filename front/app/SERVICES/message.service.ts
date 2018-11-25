import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class MessageService {

    constructor(
        private snackBar: MatSnackBar,
    ){}

    isAuth = false;
    loggedUser={};

    openSnackBar(message: string, action:string) {
        let config=new MatSnackBarConfig();
        if(action=="fail"){
            config.extraClasses=['snackbar-fail'];
        }
        else{
            config.extraClasses=['snackbar-success'];
        }
        config.duration=3000;
        this.snackBar.open(message, "", config);
    }
}