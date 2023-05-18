import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { Order } from '../../order.model';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addOrder', () => {
    it('should add an order', () => {
      const order: Order = { items: ['item1', 'item2'], subtotal: 100 };
      const mockResponse: Order[] = [{ items: ['item1', 'item2'], subtotal: 100 }];
      service.addOrder(order).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      const req = httpMock.expectOne('http://localhost:5000/user/order');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('getUserOrder', () => {
    it('should get user orders', () => {
      const uuid = '123';
      const fromDate = '2022-01-01';
      const toDate = '2022-01-31';
      const mockResponse: any = [{ items: ['item1', 'item2'], subtotal: 100 }];
      service.getUserOrder(uuid, fromDate, toDate).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      const req = httpMock.expectOne(`http://localhost:5000/user/order/${uuid}?fromDate=${fromDate}&toDate=${toDate}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
