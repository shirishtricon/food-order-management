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
import { AuthGuard } from './_auth/auth.guard';
import { OrderComponent } from './View/order/order.component';


const routes: Routes = [
  // { path: 'categories', component: CategoriesComponent },
  { path: '', component: HomeComponent },
  // { path: 'addItem', component: AddItemComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  // { path: 'addCategory', component: AddCategoryComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']},
    children: [
      {path: 'categories', component: CategoriesComponent},
      {path: 'addItem', component: AddItemComponent}, 
      {path: 'addCategory', component: AddCategoryComponent},
      {path: 'orders', component: OrderComponent}
    ]
},
  { path: 'user', component: UserComponent, canActivate:[AuthGuard], data:{roles:['User']},
  children: [
    {path: 'categories', component: CategoriesComponent},
    {path: 'orders', component: OrderComponent}
  ]
},
  { path: 'forbidden', component: ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
