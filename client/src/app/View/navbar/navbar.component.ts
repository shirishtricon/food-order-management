import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Model/Services/data.service';
import { UserAuthService } from 'src/app/Model/Services/user-auth.service';
import { CategoriesComponent } from '../categories/categories.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  totalPrice: number = 0;
  name :string = '';

  constructor(private dataService: DataService, 
              private userAuthService: UserAuthService,
              private router: Router,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    let tokenDetials = this.userAuthService.decodedToken();
    if(tokenDetials) {
      
    let role = tokenDetials.role;
    if(role === 'User') {
      this.name = tokenDetials.name
    }
    }
  }
  

  @Input() displayTextIn: string;
  getPrice() {
    this.totalPrice = this.dataService.getTotalPrice();
    return this.totalPrice;
  }

  logout() {
    this.ngxService.start();
    setTimeout(() => {
      this.userAuthService.clear();
      this.router.navigate(['/home']);
      this.ngxService.stop();
    },1000)
  }

  isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  isAdmin() {
    const decodedToken = this.userAuthService.decodedToken();
    if(decodedToken.role === 'Admin') {
      return true;
    } else {
      return false;
    }
  }


}
