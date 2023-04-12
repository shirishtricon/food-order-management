import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../Model/Services/user-auth.service';
import { LoginService } from '../Model/Services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private userAuthService: UserAuthService,
              private router: Router,
              private loginService: LoginService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userAuthService.getToken() !== null) {
      const role = route.data['roles'] as Array<string>;
      if(role) {
        const match = this.loginService.roleMatch(role[0])

        if(match) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }

    this.router.navigate(['/home']);
    return false
    
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
  
}
