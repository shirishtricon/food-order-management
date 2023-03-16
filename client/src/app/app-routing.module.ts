import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './View/add-category/add-category.component';
import { AddItemComponent } from './View/add-item/add-item.component';
import { CategoriesComponent } from './View/categories/categories.component';

const routes: Routes = [
  {
    path: 'categories', component: CategoriesComponent
  },
  {
    path: '', component: CategoriesComponent
  },
  {
    path: 'addItem', component: AddItemComponent
  },
  {
    path: 'addCategory', component: AddCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
