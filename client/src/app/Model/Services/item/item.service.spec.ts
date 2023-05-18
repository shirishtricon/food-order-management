import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemService } from './item.service';
import { Item } from '../../item.model';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ItemService ]
    });

    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an Observable<Item[]>', () => {
    const dummyItems: Item[] = [
      { uuid: '1', name: 'Item 1', price: 10, ratings: 4, category_uuid: '1', quantity: 20 },
      { uuid: '2', name: 'Item 2', price: 20, ratings: 5, category_uuid: '2', quantity: 30 },
      { uuid: '3', name: 'Item 3', price: 30, ratings: 3, category_uuid: '1', quantity: 40 }
    ];

    service.getItems().subscribe(items => {
      expect(items.length).toBe(3);
      expect(items).toEqual(dummyItems);
    });

    const req = httpMock.expectOne('http://localhost:5000/admin/items');
    expect(req.request.method).toBe('GET');
    req.flush(dummyItems);
  });

  it('should return an error message when the server returns a 0 status code', () => {
    const errorMessage = 'Server timeout. Please try again later.';
    const mockErrorResponse:any = { status: 0, statusText: 'Server timeout' };
    const mockError = new ErrorEvent('Network error', mockErrorResponse);
    service.getItems().subscribe(
      items => fail('expected an error, not items'),
      error => expect(error).toContain(errorMessage)
    );
    const req = httpMock.expectOne('http://localhost:5000/admin/items');
    expect(req.request.method).toBe('GET');
    req.error(mockError);
  });

  it('should return an error message when the server returns an error', () => {
    const errorMessage = 'Something went wrong. Please try again later.';
    service.getItems().subscribe(
      items => fail('expected an error, not items'),
      error => expect(error).toContain(errorMessage)
    );
    const req = httpMock.expectOne('http://localhost:5000/admin/items');
    expect(req.request.method).toBe('GET');
    req.flush('Invalid request parameters', { status: 400, statusText: 'Bad Request' });
  });
  describe('addItems', () => {
    it('should add an item', () => {
      const mockItem: Item = {
        uuid: '1234',
        name: 'Test Item',
        price: 10.99,
        ratings: 4,
        category_uuid: '5678',
        quantity: 100
      };
      service.addItems(mockItem).subscribe((items) => {
        expect(items.length).toBe(1);
        expect(items[0]).toEqual(mockItem);
      });
      const req = httpMock.expectOne('http://localhost:5000/admin/item');
      expect(req.request.method).toBe('POST');
      req.flush([mockItem]);
    });
  });

  describe('updateItem', () => {
    it('should update an item', () => {
      const mockItem: Item = {
        uuid: '1234',
        name: 'Test Item',
        price: 10.99,
        ratings: 4,
        category_uuid: '5678',
        quantity: 100
      };
      const mockUpdatedItem = {
        uuid: '1234',
        name: 'Test Item Updated',
        price: 20.99,
        ratings: 4,
        category_uuid: '5678',
        quantity: 100
      };
      service.updateItem(mockUpdatedItem, mockItem.uuid).subscribe((items) => {
        expect(items.length).toBe(1);
        expect(items[0]).toEqual(mockUpdatedItem);
      });
      const req = httpMock.expectOne(`http://localhost:5000/admin/item/${mockItem.uuid}`);
      expect(req.request.method).toBe('PUT');
      req.flush([mockUpdatedItem]);
    });
  });

  it('should delete an item', () => {
    const uuid = '123';
    service.deleteItem(uuid).subscribe(
      (response) => {
        expect(response).toBeNull();
      }
    );
    const req = httpMock.expectOne(`http://localhost:5000/admin/item/${uuid}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

