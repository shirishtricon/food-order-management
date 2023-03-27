import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './View/add-category/add-category.component';
import { AddItemComponent } from './View/add-item/add-item.component';
import { AdminComponent } from './View/admin/admin.component';
import { CategoriesComponent } from './View/categories/categories.component';
import { ForbiddenComponent } from './View/forbidden/forbidden.component';
import { HomeComponent } from './View/home/home.component';
import { LoginComponent } from './View/login/login.component';
import { UserComponent } from './View/user/user.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: '', component: HomeComponent },
  { path: 'addItem', component: AddItemComponent },
  { path: 'addCategory', component: AddCategoryComponent },
  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'user', component: UserComponent},
  { path: 'forbidden', component: ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
