import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private totalPrice: number;

  setTotalPrice(price:number) {
    this.totalPrice = price;
  }

  getTotalPrice() {
    return this.totalPrice
  }
}
