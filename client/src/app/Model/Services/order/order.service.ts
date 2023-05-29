import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../order.model';
import { API_BASE_URL } from '../../../../api.config'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  addOrder(order: Order) {
    return this.http.post<Order[]>(`${API_BASE_URL}/user/order`,order)
  }

  getUserOrder(uuid: string, fromDate: string, toDate: string) {
    return this.http.get<any>(`${API_BASE_URL}/user/order/${uuid}`, {params: {fromDate: fromDate, toDate: toDate}})
  }
}
