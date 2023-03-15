import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
