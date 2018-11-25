import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserListComponent } from './USERS/user-list/user-list.component';
import { NewUserComponent } from './USERS/new-user/new-user.component';
import { ComplaintsListComponent } from './COMPLAINTS/complaints-list/complaints-list.component';
import { NewComplaintComponent } from './COMPLAINTS/new-complaint/new-complaint.component';
import { LogInComponent } from './USERS/log-in/log-in.component';

import { ComplaintsFilterPipe } from './PIPES/complaints.pipes';
import { UsersFilterPipe } from './PIPES/users.pipes';

import { UserService } from './SERVICES/user.service';
import { ComplaintsService } from './SERVICES/complaints.service';
import { AuthService } from './SERVICES/auth.service';
import { MessageService } from './SERVICES/message.service';
import { AuthGuardService } from './SERVICES/authGuard.service';


const routes: Routes=[
  {path:'', component:LogInComponent},
  {path:'users', canActivate:[AuthGuardService],component:UserListComponent},
  {path:'users/:id', canActivate:[AuthGuardService], component:NewUserComponent},
  {path:'users/new', component:NewUserComponent},
  {path:'complaints', canActivate:[AuthGuardService], component:ComplaintsListComponent},
  {path:'complaints/received', canActivate:[AuthGuardService], component:ComplaintsListComponent},
  {path:'complaints/sent', canActivate:[AuthGuardService], component:ComplaintsListComponent},
  {path:'complaints/:id', canActivate:[AuthGuardService], component:NewComplaintComponent},
  {path:'complaints/new', canActivate:[AuthGuardService], component:NewComplaintComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UserListComponent,
    NewUserComponent,
    ComplaintsListComponent,
    NewComplaintComponent,
    LogInComponent,
    ComplaintsFilterPipe,
    UsersFilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  exports: [
    MatSelectModule,
  ],
  providers: [
    UserService,
    ComplaintsService,
    AuthService,
    AuthGuardService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
