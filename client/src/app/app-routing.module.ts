import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './View/add-category/add-category.component';
import { AddItemComponent } from './View/add-item/add-item.component';
import { CategoriesComponent } from './View/categories/categories.component';
import { HomeComponent } from './View/home/home.component';
import { LoginComponent } from './View/login/login.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: '', component: HomeComponent },
  { path: 'addItem', component: AddItemComponent },
  { path: 'addCategory', component: AddCategoryComponent },
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
