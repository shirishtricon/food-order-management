import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get total price', () => {
    const price = 100;
    service.setTotalPrice(price);
    expect(service.getTotalPrice()).toEqual(price);
  });

  it('should set and get role', () => {
    const role = 'admin';
    service.setRole(role);
    expect(service['role']).toEqual(role); 
  });
});
