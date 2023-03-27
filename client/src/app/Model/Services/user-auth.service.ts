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
    return localStorage.getItem('token')
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

  public decodedToken() {
    if(this.getToken()) {
      const decodedToken = helper.decodeToken(this.token);
      return decodedToken;
    } else {
      return null;
    }
  }
}
