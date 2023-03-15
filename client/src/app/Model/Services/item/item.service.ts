import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Item } from '../../item.model';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Item[]>('http://localhost:5000/admin/items')
  };

  addItems(items: Item) {
    return this.http.post<Item[]>('http://localhost:5000/admin/item',items)
  }
}
