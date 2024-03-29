import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/Model/Services/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  @ViewChild('categoryForm') form = NgForm;
  categoryAdded: string;
  
  lastCategoryName: string;

  constructor(private categoryService: CategoryService) { }

  onCategoryAdd(form:any) {
    if(form.valid) {
      let category: any = {
        categoryName: form.value.name,
      }
      this.categoryService.addCategory(category).subscribe((data:any) => {
     
        this.lastCategoryName = data.name;
        this.categoryAdded = 'Done';
        if (form && form.reset instanceof Function) {
          form.reset();
        }
      }, (err) => {
        this.categoryAdded = 'Error'
      })
    } else {
      this.categoryAdded = 'Empty'
    }
  }
}
