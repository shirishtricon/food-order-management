import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './View/navbar/navbar.component';
import { CategoriesComponent } from './View/categories/categories.component';
import { AddItemComponent } from './View/add-item/add-item.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './View/add-category/add-category.component';
import { LoginComponent } from './View/login/login.component';
import { HomeComponent } from './View/home/home.component';
import { SignupComponent } from './View/signup/signup.component';
import { ForbiddenComponent } from './View/forbidden/forbidden.component';
import { AdminComponent } from './View/admin/admin.component';
import { UserComponent } from './View/user/user.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoriesComponent,
    AddItemComponent,
    AddCategoryComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ForbiddenComponent,
    AdminComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
