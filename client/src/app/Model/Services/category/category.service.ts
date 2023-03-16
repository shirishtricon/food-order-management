import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Category } from '../../category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
   return this.http.get<Category[]>('http://localhost:5000/admin/categories') 
  }

  addCategory(category: Category) {
    return this.http.post<Category[]>('http://localhost:5000/admin/category',category)
  }
}
