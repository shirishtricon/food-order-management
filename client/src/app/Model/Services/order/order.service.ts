import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  addOrder(order: Order) {
    return this.http.post<Order[]>('http://localhost:5000/user/order',order)
  }

  getUserOrder(uuid: string) {
    return this.http.get<any>(`http://localhost:5000/user/order/${uuid}`)
  }
}
