import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }

  login(loginData:any):Observable<any> {
    const headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*')
    .set('No-Auth','True')
    return this.http.post('http://localhost:5000/login', loginData, {headers: headers})
  }
  
  public roleMatch(allowedRole: any): boolean {
    let isMatch = false;
    const decodedToken = this.userAuthService.decodedToken();
    const role = decodedToken.role ? decodedToken.role : null;

    if(role === allowedRole) {
      isMatch = true;
    }
    return isMatch; 
  }
}
