import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category.component';
import { CategoryService } from 'src/app/Model/Services/category/category.service';

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let fixture: ComponentFixture<AddCategoryComponent>;
  let categoryService: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AddCategoryComponent],
      providers: [CategoryService]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set categoryAdded to "Done" when a category is successfully added', () => {
    const category = { name: 'Test Category' };
    const responseData = { name: 'Test Category' };
    component.onCategoryAdd({ value: category, valid: true });
    const request = httpMock.expectOne('http://localhost:5000/admin/category');
    expect(request.request.method).toBe('POST');
    request.flush(responseData);
    expect(component.lastCategoryName).toBe('Test Category');
    expect(component.categoryAdded).toBe('Done');
  });

  it('should set categoryAdded to "Error" when there is an error adding a category', () => {
    const category = { name: 'Test Category' };

    component.onCategoryAdd({ value: category, valid: true });
    const request = httpMock.expectOne('http://localhost:5000/admin/category');
    expect(request.request.method).toBe('POST');
    request.error(new ErrorEvent('Error'));
    expect(component.categoryAdded).toBe('Error');
  });

  it('should set categoryAdded to "Empty" when the form is invalid', () => {
    component.onCategoryAdd({ valid: false });
    expect(component.categoryAdded).toBe('Empty');
  });
});
