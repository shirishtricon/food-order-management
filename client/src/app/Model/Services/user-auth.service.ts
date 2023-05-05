import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  token: any;
  constructor() { }

  public setToken(jwtToken: string) {
    localStorage.setItem('token', jwtToken);
  }

  public getToken() {
    this.token = localStorage.getItem('token');
    //return localStorage.getItem('token')
    return this.token;
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    if(this.getToken()) {
      return true
    } else {
      return false
    }
  }

  public decodedToken(): any {
    if(this.getToken()) {
      const decodedToken = helper.decodeToken(this.token);
      return decodedToken;
    } else {
      return null;
    }
  }

  public isAdmin():any {
    let decodedToken = this.decodedToken();
    if(decodedToken.role === 'Admin') {
      return true;
    } else {
      return false;
    }
  }
}
