import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CategoryService } from './category.service';
import { Category } from '../../category.model';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service instanceof CategoryService).toBeTruthy();
  });

  describe('getCategories()', () => {
    it('should return an Observable<Category[]>', () => {
      const mockCategories: Category[] = [
        { uuid: '02a7bef4-e589-434f-b4c6-017433a159c9', name: 'Hot Beverages', quantity: 0 },
        { uuid: '073b5cd3-c2a0-4417-8db6-7d0ec1322de9', name: 'Bakery Items', quantity: 0 },
        { uuid: '246cde4b-22ea-42ab-b33a-4310e7f4559c', name: 'Sandwiches', quantity:0 }
      ];

      service.getCategories().subscribe(categories => {
        expect(categories.length).toBe(3);
        expect(categories).toEqual(mockCategories);
      });
      const request = httpMock.expectOne('http://localhost:5000/admin/categories');
      expect(request.request.method).toBe('GET');
      request.flush(mockCategories);
    });
  });

  describe('addCategory()', () => {
    it('should return an Observable<Category[]>', () => {
      const mockCategory: Category = { uuid: 'flje9-fwilr-sfil33', name: 'Beverages', quantity: 0 };
      service.addCategory(mockCategory).subscribe(categories => {
        expect(categories.length).toBe(1);
        expect(categories[0]).toEqual(mockCategory);
      });
      const request = httpMock.expectOne('http://localhost:5000/admin/category');
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(mockCategory);
      request.flush([mockCategory]);
    });
  });
});