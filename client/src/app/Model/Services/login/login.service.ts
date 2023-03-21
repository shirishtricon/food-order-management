import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string, role: string):Observable<any> {
    const headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*')
    return this.http.post('http://localhost:5000/login', JSON.stringify({email, password,role}), {headers: headers})
  }
}
