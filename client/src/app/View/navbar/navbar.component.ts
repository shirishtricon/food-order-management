import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Model/Services/data.service';
import { UserAuthService } from 'src/app/Model/Services/user-auth.service';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  totalPrice: number = 0;

  constructor(private dataService: DataService, 
              private userAuthService: UserAuthService,
              private router: Router) { }

  ngOnInit() {
    
  }

  @Input() displayTextIn: string;
  getPrice() {
    this.totalPrice = this.dataService.getTotalPrice();
    return this.totalPrice;
  }

  logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home'])
  }

  isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }
  
}
