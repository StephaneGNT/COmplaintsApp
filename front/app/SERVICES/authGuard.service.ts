import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private authService:AuthService,
        private router:Router
    ){};

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
            if(this.router.url==="/users/new"){
                return true;
            }
            else if(this.authService.isAuth){
                return true;
            }
            else{
                this.router.navigate(['']);
            }
        }
}