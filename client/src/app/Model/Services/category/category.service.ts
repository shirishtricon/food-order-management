import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Category } from '../../category.model';
import { API_BASE_URL } from '../../../../api.config'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
   return this.http.get<Category[]>(`${API_BASE_URL}/admin/categories`) 
  }

  addCategory(category: Category) {
    return this.http.post<Category[]>(`${API_BASE_URL}/admin/category`,category)
  }
}
