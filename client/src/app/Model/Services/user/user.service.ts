import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../user.mode';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addItems(user: User) {
    return this.http.post<User[]>('http://localhost:5000/user',user)
  }
}
