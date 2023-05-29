  import { Component, OnInit, ViewChild } from '@angular/core';
  import { NgForm } from '@angular/forms';
  import { Router } from '@angular/router';
  import { NgxUiLoaderService } from 'ngx-ui-loader';
  import { LoginService } from 'src/app/Model/Services/login/login.service';
  import { UserAuthService } from 'src/app/Model/Services/user-auth.service';
  import { UserService } from 'src/app/Model/Services/user/user.service';

  declare var window: any;
  import { Modal } from 'bootstrap';

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit{
    @ViewChild('loginForm') form = NgForm;
    @ViewChild('loginModal', { static: false }) loginModal: any;
    message: any;
    login: boolean = false;
    formModal: any;

    ngOnInit(): void {
      this.formModal = new Modal(
        document.getElementById('loginModal') as HTMLElement
      );
    }

    constructor(private loginServie: LoginService, 
                private userAuthService: UserAuthService,
                private router: Router,
                private ngxService: NgxUiLoaderService) { }

    onLogin(form:any) {
      if(form.valid) {
        this.loginServie.login(form.value).subscribe((response) => {
          this.ngxService.start();
          console.log(response);
          this.login = true;
          this.userAuthService.setToken(response.token);
          const tokenDetails = this.userAuthService.decodedToken();
          console.log(tokenDetails);
          
          setTimeout(() => {
          
            this.ngxService.stop();
            if(tokenDetails.role === 'Admin') {
              this.router.navigate(['/admin/categories'])
            } else {
              this.router.navigate(['/user/categories'])
            }
          },2000)
          
        }, (error) => {
          console.log(error.status);
          if(error.status === 0) {
            this.message = 'Server Unavailable. Try again later';
            this.openModal()
          } else {
            if(error.error) {
              this.message = error.error.message;
              this.openModal();
            }
          }
         
        })
      } else {
        this.message = "Enter All Details"
        this.openModal();
      }
    }

    openModal() {
      this.formModal.show();
    }
  }