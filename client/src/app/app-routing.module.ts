import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './View/categories/categories.component';

const routes: Routes = [
  {
    path: 'categories', component: CategoriesComponent
  },
  {
    path: '', component: CategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
