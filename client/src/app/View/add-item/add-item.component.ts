import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/Model/category.model';
import { Item } from 'src/app/Model/item.model';
import { CategoryService } from 'src/app/Model/Services/category/category.service';
import { ItemService } from 'src/app/Model/Services/item/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit{

  @ViewChild('itemForm') form = NgForm;

  allCategories: any[] = [];
  filteredCategory: Item[]  = [];
  lastItemId: number;
  lastItemName: string;
  itemAdded: string;

  constructor(private categoryService: CategoryService, private itemService: ItemService) { }

  ngOnInit() {
    this.fetchAllCategories();
    console.log(this.allCategories);
    
  }

  fetchAllCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.allCategories.push(...data)
    })
  };

  onItemAdd(form:any) {
    if(form.valid) {
      let item: any = {
        name: form.value.name,
        description: form.value.description,
        price: form.value.price,
        ratings: form.value.ratings,
        discount: form.value.discount,
        category_id: this.resolveCategoryNameToCategoryId(form.value.category)
      }
      this.itemService.addItems(item).subscribe((data:any) => {
        this.lastItemId = data.id;
        this.lastItemName = data.name;
        this.itemAdded = 'Done'
      }, (err) => {
        this.itemAdded = 'Error'
      })
    } else {
      this.itemAdded = 'Empty'
    }
    
  }

  resolveCategoryNameToCategoryId(categoryName:string) {
    let filtertedCategory = this.allCategories.filter((category) => {
      return category.name === categoryName
    });
    this.filteredCategory = [...filtertedCategory];    
    return this.filteredCategory[0].id;
  }
}