import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './Model/Services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';

  constructor(private userAuthService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    // localStorage.clear()
    const isLoggedIn = this.userAuthService.isLoggedIn();
    const decodedToken = this.userAuthService.decodedToken();
    const currentTime = new Date().getTime() / 1000;

    if(decodedToken) {
      if(decodedToken.exp < currentTime) {
        localStorage.removeItem('token')
      } else {
        if(isLoggedIn) {
      
          let role = decodedToken.role.toString();
          role = role.toLocaleLowerCase();
    
          this.router.navigate([`/${role}/categories`])
        } else {
          this.router.navigate(['/home']);
        }
      }
    } else {
      this.router.navigate(['/home']);
    }

  }
}
