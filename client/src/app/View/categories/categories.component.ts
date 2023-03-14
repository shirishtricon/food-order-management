import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/Model/item.model';
import { CategoryService } from 'src/app/Model/Services/category/category.service';
import { ItemService } from 'src/app/Model/Services/item/item.service';

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

  constructor(private router: Router, private categoryService: CategoryService, private itemService: ItemService) { }
  

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
    
      this.categories.push(...categories);
      console.log(this.categories);
      
      categories.map((category) => {
        this.categoryNames.push(category.name)
      })
    })
    console.log(this.categories);
    
    this.itemService.getItems().subscribe((items) => {
      for(let item of items) {
        item.quantity = 0;
      }
      this.allItems.push(...items)
    })

  }


  inc(item: any) {
    item.quantity++
  }

  dec(item:any) {
    if(item.quantity >= 1) {
      item.quantity--;
    }
    
  }


  getTotalPrice(): number {
    let totalPrice = 0;
    for (let item of this.allItems) {
      totalPrice += (+item.price) * item.quantity;
    }
    return totalPrice;
  }
  
  reloadComponent(): void {
    location.reload();
  }

  getItemsByCategory(category: number): Item[] {
    return this.allItems.filter(item => item.category_id === category);
  }
}
