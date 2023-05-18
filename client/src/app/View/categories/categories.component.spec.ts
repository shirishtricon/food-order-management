import { ComponentFixture, TestBed, tick, fakeAsync, waitForAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing"
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { UserAuthService } from 'src/app/Model/Services/user-auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ItemService } from 'src/app/Model/Services/item/item.service';
import { CategoryService } from 'src/app/Model/Services/category/category.service';
import { Item } from 'src/app/Model/item.model';
import { OrderService } from 'src/app/Model/Services/order/order.service';
import { Order } from 'src/app/Model/order.model';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoryService: CategoryService;
  let ngxUiLoaderService: NgxUiLoaderService;
  let router: Router;
  let itemService: ItemService;
  let orderService: OrderService;
  let mockDecodedDetail = {
    uuid: '4bfd1a28-d1de-4295-9171-4b6a26daff76',
    name: 'Shirish Kulkarni',
    email: 'shirishkpl109@gmail.com',
    role: 'User'
  };
  let mockCategories:any = [
    { name: 'Category 1' },
    { name: 'Category 2' },
    { name: 'Category 3' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [CategoriesComponent],
      providers: [
        { provide: UserAuthService, useValue: { isLoggedIn: () => true, isAdmin: () => false, decodedToken: () => mockDecodedDetail } },
        NgxUiLoaderService,
        ItemService,
        CategoryService,
        OrderService
      ]
    })
    .compileComponents();
    

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    router = TestBed.inject(Router);
    itemService = TestBed.inject(ItemService);
    ngxUiLoaderService = TestBed.inject(NgxUiLoaderService);
    orderService = TestBed.inject(OrderService); 
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAdmin flag correctly', () => {
    const userAuthService = TestBed.inject(UserAuthService);
    spyOn(userAuthService, 'isAdmin').and.returnValue(true);
    component.ngOnInit();
    expect(component.isAdmin).toBeTrue();
    expect(userAuthService.isAdmin).toHaveBeenCalled();
  });

  it('should call fetchItems method and update allItems', () => {
    const ngxUiLoaderService = TestBed.inject(NgxUiLoaderService);
    const itemService = TestBed.inject(ItemService);
    const mockItems = [
      { uuid: '1', name: 'Item 1', quantity: 0 },
      { uuid: '2', name: 'Item 2', quantity: 0 },
      { uuid: '3', name: 'Item 3', quantity: 0 }
    ];
    spyOn(ngxUiLoaderService, 'start');
    spyOn(ngxUiLoaderService, 'stop');
    spyOn(itemService, 'getItems').and.returnValue(of(mockItems));

    component.fetchItems();

    expect(ngxUiLoaderService.start).toHaveBeenCalled();
    expect(itemService.getItems).toHaveBeenCalled();
    expect(component.allItems).toEqual(jasmine.arrayContaining(mockItems));
    expect(ngxUiLoaderService.stop).toHaveBeenCalled();
  });

  it('should fetch categories and populate categories array', () => {
    const mockCategories:any = [
      { uuid: '1', name: 'Category 1'},
      { uuid: '2', name: 'Category 2'},
      { uuid: '3', name: 'Category 3'}
    ];
    spyOn(categoryService, 'getCategories').and.returnValue(of(mockCategories));
    component.fetchCategories();
    expect(component.categories).toEqual(mockCategories);
    expect(component.categoryNames).toEqual(['Category 1', 'Category 2', 'Category 3']);
    expect(categoryService.getCategories).toHaveBeenCalled();
  });

  it('should log error message if unable to fetch categories', () => {
    const mockError = 'Error fetching categories';
    spyOn(console, 'log');
    spyOn(categoryService, 'getCategories').and.returnValue(
      new Observable(observer => {
        observer.error(mockError);
      })
    );
    component.fetchCategories();
    expect(console.log).toHaveBeenCalledWith(mockError);
    expect(categoryService.getCategories).toHaveBeenCalled();
  });


  it('should increase item quantity and add it to allSelectedItems', () => {
    const item = { uuid: '1', name: 'Item 1', quantity: 0 };
    component.inc(item);
    expect(item.quantity).toBe(1);
    expect(component.allSelectedItems).toContain(item);
  });

  it('should decrease item quantity and add it to allSelectedItems if quantity is greater than or equal to 1', () => {
    const item = { uuid: '2', name: 'Item 2', quantity: 2 };
    component.dec(item);
    expect(item.quantity).toBe(1);
    expect(component.allSelectedItems).toContain(item);
  });

  it('should not decrease item quantity or add it to allSelectedItems if quantity is 0', () => {
    const item = { uuid: '3', name: 'Item 3', quantity: 0 };
    component.dec(item);
    expect(item.quantity).toBe(0);
    expect(component.allSelectedItems).not.toContain(item);
  });


  it('should select unique items, remove items with quantity 0, and update selectedItemsArray', () => {
    component.allSelectedItems = [
      { uuid: '1', name: 'Item 1', quantity: 2 },
      { uuid: '2', name: 'Item 2', quantity: 0 },
      { uuid: '3', name: 'Item 3', quantity: 3 },
      { uuid: '1', name: 'Item 1', quantity: 1 },
      { uuid: '4', name: 'Item 4', quantity: 0 }
    ];
    component.selectedItems();
    expect(component.uniqueItems).toEqual([
      { uuid: '1', name: 'Item 1', quantity: 2 },
      { uuid: '3', name: 'Item 3', quantity: 3 }
    ]);
    expect(component.selectedItemsArray).toEqual(['Item 1', 'Item 1', 'Item 3', 'Item 3', 'Item 3']);
  });

  it('should handle empty allSelectedItems array', () => {
    component.allSelectedItems = [];
    component.selectedItems();
    expect(component.uniqueItems).toEqual([]);
    expect(component.selectedItemsArray).toEqual([]);
  });


  it('should calculate the total price based on the items', () => {
    component.allItems = [
      { uuid: '1', name: 'Item 1', price: 10, ratings: 4.5, category_uuid: 'category-1', quantity: 2 },
      { uuid: '2', name: 'Item 2', price: 5, ratings: 3.8, category_uuid: 'category-2', quantity: 3 },
      { uuid: '3', name: 'Item 3', price: 8, ratings: 4.2, category_uuid: 'category-1', quantity: 1 }
    ];
    const totalPrice = component.getTotalPrice();
    expect(totalPrice).toBe(43); 
  });

  it('should handle empty allItems array', () => {
    component.allItems = [];
    const totalPrice = component.getTotalPrice();
    expect(totalPrice).toBe(0);
  });


  it('should reload the component when the reloadComponent method is called', () => {
    const reloadSpy = spyOn(component, 'reloadComponent');
    component.reloadComponent();
    expect(reloadSpy).toHaveBeenCalled();
  });


  it('should return items filtered by category', () => {
    const category = 1;
    const mockItems:any = [
      { uuid: 'item1', category_uuid: 1, name: 'Item 1', price: 10, ratings: [], quantity: 1 },
      { uuid: 'item2', category_uuid: 1, name: 'Item 2', price: 20, ratings: [], quantity: 2 },
      { uuid: 'item3', category_uuid: 2, name: 'Item 3', price: 30, ratings: [], quantity: 3 }
    ];
    component.allItems = mockItems as Item[];
    const filteredItems = component.getItemsByCategory(category);
    expect(filteredItems).toEqual([
      { uuid: 'item1', category_uuid: 1, name: 'Item 1', price: 10, ratings: [], quantity: 1 },
      { uuid: 'item2', category_uuid: 1, name: 'Item 2', price: 20, ratings: [], quantity: 2 }
    ]);
    expect(component.numberOfItems).toBe(2);
  });


  it('should navigate to add item page', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    const ngxStartSpy = spyOn(ngxUiLoaderService, 'start');
    const ngxStopSpy = spyOn(ngxUiLoaderService, 'stop');
    component.navigateToAddItems();
    tick(1500);
    expect(ngxStartSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/addItem']);
    expect(ngxStopSpy).toHaveBeenCalled();
  }));

  it('should navigate to add category page', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    const ngxStartSpy = spyOn(ngxUiLoaderService, 'start');
    const ngxStopSpy = spyOn(ngxUiLoaderService, 'stop');
    component.navigateToAddCategory();
    tick(1500);
    expect(ngxStartSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/addCategory']);
    expect(ngxStopSpy).toHaveBeenCalled();
  }));



  
  it('should update item and fetch items when form is valid', fakeAsync(() => {
    const formValue = {
      name: 'Updated Item',
      price: 20,
      category: 'Category B'
    };
    const form = {
      value: formValue,
      valid: true
    };
    const itemToUpdate = {
      uuid: 'item-uuid',
      name: 'Original Item',
      price: 10,
      category_uuid: 'category-uuid'
    };
    const mappedCategoryUuid = 'mapped-category-uuid';
    spyOn(component['ngxService'], 'start');
    spyOn(component['ngxService'], 'stop');
    spyOn(component['itemService'], 'updateItem').and.returnValue(of([]));
    spyOn(component, 'fetchItems');
    spyOn(component, 'mapCategoryNameToUuid').and.returnValue(mappedCategoryUuid);
    component.itemToUpdate = itemToUpdate;
    component.onItemUpdate(form);
    expect(component['ngxService'].start).toHaveBeenCalled();
    tick(500); 
    expect(component['itemService'].updateItem).toHaveBeenCalledWith(
      {
        name: formValue.name,
        price: formValue.price,
        category_uuid: mappedCategoryUuid
      },
      itemToUpdate.uuid
    );
    expect(component.acknowledgement).toBe('update');
    expect(component.edit).toBe(false);
    expect(component.fetchItems).toHaveBeenCalled(); 
    expect(component['ngxService'].stop).toHaveBeenCalled();
  }));
  


  it('should set default items and patch form values', () => {
    const formMock: NgForm = {
      value: {
        name: '',
        price: null,
        category: ''
      },
      form: {
        patchValue: jasmine.createSpy('patchValue')
      }
    } as unknown as NgForm;
    component.allItems = [
      {
        uuid: 'item-uuid',
        name: 'Item 1',
        price: 10,
        ratings: 2,
        quantity:2,
        category_uuid: 'category-uuid'
      },
      {
        uuid: 'item-uuid-2',
        name: 'Item 2',
        ratings: 2,
        quantity:2,
        price: 20,
        category_uuid: 'category-uuid-2'
      }
    ];
    spyOn(component, 'mapCategoryUuidToCategoryName').and.returnValue(['Category A']);
    component.form = formMock as unknown as NgForm;
    component.setDefaultItems('item-uuid');
    expect(formMock.form.patchValue).toHaveBeenCalledWith({
      name: 'Item 1',
      price: 10,
      category: 'Category A'
    });
  });


  it('should map category UUID to category name', () => {
    const categoryUuid = 'category-uuid';
    const categoryName = 'Category A';

    component.categories = [
      { uuid: categoryUuid, name: categoryName },
      { uuid: 'category-uuid-2', name: 'Category B' }
    ];
    const result = component.mapCategoryUuidToCategoryName(categoryUuid);
    expect(result).toEqual([categoryName, categoryUuid]);
  });

  it('should map category name to category UUID', () => {
    const categoryName = 'Category A';
    const categoryUuid = 'category-uuid';

    component.categories = [
      { uuid: categoryUuid, name: categoryName },
      { uuid: 'category-uuid-2', name: 'Category B' }
    ];
    const result = component.mapCategoryNameToUuid(categoryName);
    expect(result).toEqual(categoryUuid);
  });

  
  it('should set edit to true', () => {
    component.editToTrue();
    expect(component.edit).toBe(true);
  });

  it('should set itemToBeDeleted', () => {
    const uuid = 'item-uuid';
    component.onItemDelete(uuid);
    expect(component.itemToBeDeleted).toBe(uuid);
  });


  it('should delete item', fakeAsync(() => {
    const itemToBeDeleted = 'item-uuid';
    spyOn(component, 'fetchItems');
    spyOn(component, 'deleteItem').and.callThrough();
    component.itemToBeDeleted = itemToBeDeleted;
    component.deleteItem();
    expect(component.deleteItem).toHaveBeenCalled();
    tick(500);
    expect(component.fetchItems).toHaveBeenCalled();
    flush()
  }));


  it('should set delete to true', () => { 
    component.deleteToTrue();
    expect(component.delete).toBeTruthy();
  });

  it('should return an array of selected items', () => {
    const uniqueItems = [
      { name: 'Item 1', quantity: 2 },
      { name: 'Item 2', quantity: 3 },
    ];
    const expectedResult = ['Item 1', 'Item 1', 'Item 2', 'Item 2', 'Item 2'];
    const result = component.returnArrayOfSelectedItems(uniqueItems);
    expect(result).toEqual(expectedResult);
  });


  it('should submit the order and show success', () => {
    component.selectedItemsArray = ['Item 1', 'Item 2'];
    spyOn(orderService, 'addOrder').and.returnValue(of([]));
    component.submitOrder();
    expect(component.show).toBeFalsy();
    expect(orderService.addOrder).toHaveBeenCalledWith({
      items: ['Item 1', 'Item 2'],
      subtotal: component.getTotalPrice()
    });
  });

  it('should navigate to admin orders when isAdmin is true', fakeAsync(() => {
    spyOn(ngxUiLoaderService, 'start');
    spyOn(ngxUiLoaderService, 'stop');
    spyOn(router, 'navigate');

    component.isAdmin = true;
    component.navigateToOrders();
    tick(1500);

    expect(ngxUiLoaderService.start).toHaveBeenCalled();
    expect(ngxUiLoaderService.stop).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/admin/orders']);
  }));
});
