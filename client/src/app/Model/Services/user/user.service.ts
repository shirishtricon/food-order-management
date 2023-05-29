import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../user.model';
import { API_BASE_URL } from '../../../../api.config'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: User) {
    return this.http.post<User[]>(`${API_BASE_URL}/user`,user)
  }

  getAllUsers() {
    return this.http.get<User[]>(`${API_BASE_URL}/user`)
  }
}
