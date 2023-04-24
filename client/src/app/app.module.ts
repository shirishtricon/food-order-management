import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserAuthService } from './Model/Services/user-auth.service';
import { BulkUploadComponent } from './View/bulk-upload/bulk-upload.component';
import { NgbToastModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastsContainer } from './View/categories/categories-container.component';


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
    BulkUploadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbToastModule,
    NgbTooltipModule,
    ToastsContainer
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
    UserAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
