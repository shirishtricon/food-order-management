import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/Model/Services/data.service';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  totalPrice: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    
  }

  @Input() displayTextIn: string;
  getPrice() {
    this.totalPrice = this.dataService.getTotalPrice();
    return this.totalPrice;
  }
  
}
