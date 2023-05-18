import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AddItemComponent } from './add-item.component';
import { FormsModule } from '@angular/forms';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AddItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchAllCategories on ngOnInit', () => {
    spyOn(component, 'fetchAllCategories');
    component.ngOnInit();
    expect(component.fetchAllCategories).toHaveBeenCalled();
  });

  it('should populate allCategories array on fetchAllCategories', () => {
    const mockCategories = [{ name: 'Category 1' }, { name: 'Category 2' }];
    spyOn<any>(component['categoryService'], 'getCategories').and.returnValue({ subscribe: (callback: Function) => callback(mockCategories) });
    component.fetchAllCategories();
    expect(component.allCategories).toEqual(mockCategories);
  });

  it('should resolve category name to category UUID', () => {
    component.allCategories = [{ name: 'Category 1', uuid: '12345' }, { name: 'Category 2', uuid: '67890' }];
    const categoryName = 'Category 1';
    const resolvedUUID = component.resolveCategoryNameToCategoryUuid(categoryName);
    expect(resolvedUUID).toBe('12345');
  });

  it('should set itemAdded to "Done" after successful item addition', () => {
    const formValue = { name: 'Item 1', description: 'Description', price: 10, ratings: 4, discount: 0, category: 'Category 1' };
    spyOn<any>(component['itemService'], 'addItems').and.returnValue({ subscribe: (callback: Function) => callback({ name: formValue.name }) });
    component.onItemAdd({ valid: true, value: formValue });
    expect(component.itemAdded).toBe('Done');
  });

  it('should set itemAdded to "Error" on item addition error', () => {
    const formValue = { name: 'Item 1', description: 'Description', price: 10, ratings: 4, discount: 0, category: 'Category 1' };
    spyOn<any>(component['itemService'], 'addItems').and.returnValue({ subscribe: (callback: Function, errorCallback: Function) => errorCallback() });
    component.onItemAdd({ valid: true, value: formValue });
    expect(component.itemAdded).toBe('Error');
  });

  it('should set itemAdded to "Empty" when form is invalid', () => {
    component.onItemAdd({ valid: false });
    expect(component.itemAdded).toBe('Empty');
  });
});
