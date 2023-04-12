import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Item } from '../../item.model';
import { Observable, throwError, TimeoutError  } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<any[]> {
    return this.http.get<Item[]>('http://localhost:5000/admin/items').pipe(
      timeout(5000),
      catchError(this.handleError)
    );
  };

  addItems(items: Item) {
    return this.http.post<Item[]>('http://localhost:5000/admin/item',items)
  }

  updateItem(item: any, uuid: string) {
    return this.http.put<any[]>(`http://localhost:5000/admin/item/${uuid}`,item)
  }

  deleteItem(uuid:string) {
    return this.http.delete(`http://localhost:5000/admin/item/${uuid}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
    }
    if (error.status === 0 || error.status === 504) {
      return throwError('Server timeout. Please try again later.');
    }
    return throwError('Something went wrong. Please try again later.');
  }
}
