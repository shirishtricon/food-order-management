import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Item } from 'src/app/Model/item.model';
import { CategoryService } from 'src/app/Model/Services/category/category.service';
import { DataService } from 'src/app/Model/Services/data.service';
import { ItemService } from 'src/app/Model/Services/item/item.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserAuthService } from 'src/app/Model/Services/user-auth.service';
import { LoginService } from 'src/app/Model/Services/login/login.service';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/Model/category.model';


declare var $: any;

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
  uniqueItems: any[] =[];
  defaultCategory: string;
  validationError: string = ''
  itemToUpdate:any;
  @ViewChild('updateForm') form: NgForm;
  model: Category = new Category();
  acknowledgement:string;
  isUpdated = false;
  @ViewChild('editModal', { static: false }) editModal: any;
  editModalPopUp: any;
  edit:boolean = true;
  delete:boolean = true;
  itemToBeDeleted: string;
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private categoryService: CategoryService, 
              private itemService: ItemService,
              private dataService: DataService,
              private ngxService: NgxUiLoaderService,
              private loginServcie: LoginService) { }
  

  ngOnInit() {
    
    this.fetchCategories();
    this.fetchItems();
    // this.editModalPopUp = new window.bootstrap.Modal(
    //   document.getElementById('editModal')
    // )
  }

  fetchItems() {
    this.ngxService.start()
    this.itemService.getItems().subscribe((items) => {
      for(let item of items) {
        item.quantity = 0;
      }
      this.allItems = items;
      this.ngxService.stop()
    }, error => {
      this.errorMessage = error;
      console.error('Error Retrieving Categories')
    })
   
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories.push(...categories);
      categories.map((category) => {
        this.categoryNames.push(category.name)
      })
    }, error => {
      console.log(error);
      
    })
    console.log(this.categories);
  }

  inc(item: any) {
    item.quantity++;
    if(item.quantity != 0) {
      this.allSelectedItems.push(item)
    }
    
  }

  dec(item:any) {
    if(item.quantity >= 1) {
      item.quantity--;
    }
    if (item.quantity != 0) {
      this.allSelectedItems.push(item);
    }
    
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
    
    // let zeroQuantityItem = uniqueItems.filter((item:any) => {
    //   return item.quantity === 0
    // })
    let index:any;
    for (let i = 0; i < uniqueItems.length; i++) {
      if(uniqueItems[i].quantity === 0) {
         index = i;
      }
    }
    const newUniqueItems = uniqueItems.filter((obj:any) => obj.quantity !== 0);
    
    console.log(newUniqueItems);

    this.uniqueItems = newUniqueItems;
    
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
      this.router.navigate(['/admin/addItem']);
      this.ngxService.stop();
    },1500)
  }

  navigateToAddCategory() { 
    this.ngxService.start();
    setTimeout(() => {
      this.router.navigate(['/admin/addCategory']);
      this.ngxService.stop();
    },1500)
  }

  roleMatch(role: any) {
    return this.loginServcie.roleMatch(role);
  }

  onItemUpdate(form: any) {
    
    if(form.valid) {
      this.ngxService.start()
      let updatedDetails = {
        name: form.value.name,
        price: form.value.price,
        category_id: this.mapCategoryNameToId(form.value.category)
      }
      this.itemService.updateItem(updatedDetails, this.itemToUpdate.uuid).subscribe((response) => {
        this.acknowledgement = 'update'
        this.edit = false
      })
      setTimeout(() => {
        this.fetchItems();
      },500)
      this.ngxService.stop()
    } else {
      this.validationError = 'Please Enter All Details'
    }
    
  }

  setDefaultItems(uuid:any) {
    
    // let item = this.allItems[`${uuid}`];
    let item: any = this.allItems.filter((item) => {
      return item.uuid === uuid;
    });
    this.itemToUpdate = item[0];
    console.log(this.form.form);
    
    this.form.form.patchValue({
      name: this.itemToUpdate.name,
      price: this.itemToUpdate.price,
      category: this.mapCategoryIdToCategoryName(this.itemToUpdate.category_id)[0]
    })

    
  }

  mapCategoryIdToCategoryName(category_id: any) {
    let category: any = this.categories.filter((category) => {
      return category.id === category_id
    })[0];
    return [category.name, category.uuid];
  }

  mapCategoryNameToId(categoryName: any) {
    let category: any = this.categories.filter((category) => {
      return category.name === categoryName;
    })[0];
    return category.id
  };

  editToTrue() {
    this.edit = true;
  }

  onItemDelete(uuid: string) {
    this.itemToBeDeleted = uuid
  }
  
  deleteItem() {
    this.ngxService.start();
    this.itemService.deleteItem(this.itemToBeDeleted).subscribe((response) => {
      this.delete = false
    })
    // this.fetchItems();
    setTimeout(() => {
      this.fetchItems();
    },500)
    this.ngxService.stop()
  }

  deleteToTrue() {
    this.delete = true;
  }

}


