import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Model/Services/login/login.service';
import { UserAuthService } from 'src/app/Model/Services/user-auth.service';
import { UserService } from 'src/app/Model/Services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm') form = NgForm;

  constructor(private loginServie: LoginService, 
              private userAuthService: UserAuthService,
              private router: Router) { }

  onLogin(form:any) {
    this.loginServie.login(form.value).subscribe((response) => {
      console.log(response);
      this.userAuthService.setToken(response.token);

      const tokenDetails = this.userAuthService.decodedToken();
      if(tokenDetails.role === 'Admin') {
        this.router.navigate(['/admin'])
      } else {
        this.router.navigate(['/user'])
      }
    }, (error) => {
      console.log(error);
      
    })
  }
}
