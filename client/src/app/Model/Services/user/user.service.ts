import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: User) {
    return this.http.post<User[]>('http://localhost:5000/user',user)
  }

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:5000/user')
  }
}
