import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from 'src/app/Model/Services/order/order.service';
import { UserAuthService } from 'src/app/Model/Services/user-auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  constructor(private orderService: OrderService, 
              private userAuthService: UserAuthService,
              private ngxService: NgxUiLoaderService) {}

  ngOnInit(): void {
    this.getUserTransactions();
  }

  allOrders: any[] = []
  error: boolean = false

  getUserTransactions() {
    const isLoggedIn = this.userAuthService.isLoggedIn();
    if(isLoggedIn) {
      const decodedToken = this.userAuthService.decodedToken();
      const uuid = decodedToken.uuid;
      this.orderService.getUserOrder(uuid).subscribe((res) => {
        this.allOrders = res
        console.log(this.allOrders);
      }, (err) => {
        this.error = true
        console.log(err);
      })
    } 
  }
}
