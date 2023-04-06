import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/Model/item.model';
import { CategoryService } from 'src/app/Model/Services/category/category.service';
import { DataService } from 'src/app/Model/Services/data.service';
import { ItemService } from 'src/app/Model/Services/item/item.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserAuthService } from 'src/app/Model/Services/user-auth.service';
import { LoginService } from 'src/app/Model/Services/login/login.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  showJuice = false;
  total:number = 0;
  categoryNames: string[] = []
  categories: any[] = [];
  allItems: Item[] = []
  foodItems: Item[] = [];
  numberOfItems: number;
  errorMessage: string = '';
  allSelectedItems: any[] = []
  uniqueItems: any[] =[]

  constructor(private router: Router, 
              private categoryService: CategoryService, 
              private itemService: ItemService,
              private dataService: DataService,
              private ngxService: NgxUiLoaderService,
              private loginServcie: LoginService) { }
  

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories.push(...categories);
      categories.map((category) => {
        this.categoryNames.push(category.name)
      })
    }, error => {
      console.log(error);
      
    })
    console.log(this.categories);
    
    this.itemService.getItems().subscribe((items) => {
      for(let item of items) {
        item.quantity = 0;
      }
      this.allItems.push(...items)
    }, error => {
      this.errorMessage = error;
      console.error('Error Retrieving Categories')
    })
  }

  inc(item: any) {
    item.quantity++;
    this.allSelectedItems.push(item)
  }

  dec(item:any) {
    if(item.quantity >= 1) {
      item.quantity--;
    }
    this.allSelectedItems.push(item);
  }

  selectedItems() {
    const uniqueItems = this.allSelectedItems.reduce((acc, item) => {
      const existingItemIndex = acc.findIndex((i:any) => i.id === item.id);
      if (existingItemIndex !== -1) {
        if (item.quantity > acc[existingItemIndex].quantity) {
          acc[existingItemIndex] = item;
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    this.uniqueItems = uniqueItems
    
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for (let item of this.allItems) {
      totalPrice += (+item.price) * item.quantity;
    }
    this.dataService.setTotalPrice(totalPrice)
    return totalPrice;
  }
  
  reloadComponent(): void {
    location.reload();
  }

  getItemsByCategory(category: number): Item[] {
    let itemObj = this.allItems.filter(item => item.category_id === category);
    this.numberOfItems = Object.keys(itemObj).length 
    return this.allItems.filter(item => item.category_id === category);
  }

  navigateToAddItems() {
    this.ngxService.start();
    setTimeout(() => {
      this.router.navigate(['/addItem']);
      this.ngxService.stop();
    },1500)
  }

  navigateToAddCategory() { 
    this.ngxService.start();
    setTimeout(() => {
      this.router.navigate(['/addCategory']);
      this.ngxService.stop();
    },1500)
  }

  roleMatch(role: any) {
    return this.loginServcie.roleMatch(role);
  }

}
