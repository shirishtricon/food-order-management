import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './View/navbar/navbar.component';
import { CategoriesComponent } from './View/categories/categories.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoriesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
