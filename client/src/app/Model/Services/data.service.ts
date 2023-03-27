import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private totalPrice: number;
  private role: string;

  setTotalPrice(price:number) {
    this.totalPrice = price;
  }

  getTotalPrice() {
    return this.totalPrice
  }

  setRole(role:string) {
    this.role = role;
  }
}
