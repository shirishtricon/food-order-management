import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from 'src/app/Model/Services/order/order.service';
import { UserAuthService } from 'src/app/Model/Services/user-auth.service';
import { UserService } from 'src/app/Model/Services/user/user.service';
import { User } from 'src/app/Model/user.model';
import { formatDate as ngFormatDate } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  constructor(private orderService: OrderService, 
              private userAuthService: UserAuthService,
              private ngxService: NgxUiLoaderService,
              private userService: UserService) {}

  isAdmin: boolean;
  ngOnInit(): void {
    this.isAdmin = this.userAuthService.isAdmin()
    if(!this.isAdmin) {
      this.getUserTransactions();
      this.showButtonGroup = true;
    }
    
    else
    this.getAllUsers()
  }

  allOrders: any[] = []
  error: boolean = false
  users: any[] = [];
  filteredUsers: any[] = [];
  public searchText: string;
  public selectedUser: string = ''
  isDropdownOpen: boolean = false;
  showTable: boolean = false;
  showCustom = false;
  fromDate: string = '' ;
  toDate: string = '';
  maxDate = new Date().toJSON().slice(0, 10);
  dateError: boolean = false;
  customErrorMessage: string = '';
  uuidDataToBeFetched: string;
  showButtonGroup: boolean;

  getUserTransactions() {
    const isLoggedIn = this.userAuthService.isLoggedIn();
    if(isLoggedIn) {
      const decodedToken = this.userAuthService.decodedToken();
      const uuid = decodedToken.uuid;
      this.uuidDataToBeFetched = uuid;
      // this.orderService.getUserOrder(uuid).subscribe((res) => {
      //   this.allOrders = res
      //   console.log(this.allOrders);
      // }, (err) => {
      //   this.error = true;
      //   this.selectedUser = ''
      //   console.log(err);
      // })
      this.getTransactions('week')
    } 
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
        this.filteredUsers = data;
    },(error) => {
      console.error(error);
    })
  }

  public filterUsers() {
    this.filteredUsers = this.users.filter((user) => {
      this.showTable = false
      return user.name.toLowerCase().includes(this.selectedUser.toLowerCase());
    });
  }

  public selectUser(name: string, uuid: string) {
    this.selectedUser = name;
    this.isDropdownOpen = false;
    this.uuidDataToBeFetched = uuid
    this.getTransactions('week')
  }

  public toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getUserData(uuid: string, fromDate: string, toDate: string) {
    this.ngxService.start();
    this.orderService.getUserOrder(uuid, fromDate, toDate).subscribe((data) => {
      setTimeout(() => {
        this.allOrders = data;
        this.error = false;
        this.isDropdownOpen = false;
        this.showTable = true;
        this.ngxService.stop();
      },500)
    },(err) => {
      this.ngxService.stop()
      this.error = true
      this.isDropdownOpen = false;
      this.showButtonGroup = false
      console.log(err);
    })
  }

  formatDate(date: string): Date {
    const formattedDate = new Date(date);
    return formattedDate;
  }

  showCustomPeriod() {
    this.showCustom = true;
    this.error = false
    // this.showTable = false;
  }

  hideCustomPeriod() {
    this.showCustom = false
  }

  checkCustomValidation() {
    console.log("From date:", this.fromDate);
    console.log("To date:", this.toDate);
    if(this.fromDate <= this.toDate) {
      this.dateError = false;
      // alert('valid')
      return true
    } else {
      this.dateError = true;
      return false
    }
  }

  getTransactions(period: string): void {

      this.dateError = false;
      if (period === 'custom' && this.dateError) {
        return;
      }
  
      let fromDate: string = '';
      let toDate: string = '';
  
      if (period === 'week') {
        toDate = new Date().toISOString().slice(0, 10);
        const from = new Date();
        from.setDate(from.getDate() - 7);
        fromDate = from.toISOString().slice(0, 10);
      } else if (period === 'month') {
        toDate = new Date().toISOString().slice(0, 10);
        const from = new Date();
        from.setMonth(from.getMonth() - 1);
        fromDate = from.toISOString().slice(0, 10);
      } else {
        fromDate = this.fromDate;
        toDate = this.toDate;
        if (fromDate ==='' || toDate === '') {
          this.dateError = true;
          this.customErrorMessage = 'Please select all fields'
          return;
  
        } else if(fromDate > toDate) {
          this.dateError = true;
          this.customErrorMessage = 'From date cannot be more than To date'
          return
        } else {
          this.dateError = false;
        }
      }
      const url = `https://your-api-url.com/transactions?from=${fromDate}&to=${toDate}`;
      this.getUserData(this.uuidDataToBeFetched, fromDate, toDate);

    
  }
  

  
}
