import { Component, OnInit } from '@angular/core';
import { AuthService } from '../SERVICES/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private authService:AuthService,
  ) { }

  public isAuth;

  ngOnInit() {
    this.isAuth=this.authService.isAuth;
  }

  ngDoCheck() {
    this.isAuth=this.authService.isAuth;
  }

  logOut(){
    this.authService.signOut();
  }

}
