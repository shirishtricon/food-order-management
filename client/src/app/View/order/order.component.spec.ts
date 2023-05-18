import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderComponent } from './order.component';
import { UserAuthService } from 'src/app/Model/Services/user-auth.service';
import { UserService } from 'src/app/Model/Services/user/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from 'src/app/Model/Services/order/order.service';
import { of, throwError } from 'rxjs';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let userAuthService: jasmine.SpyObj<UserAuthService>;
  let userService: jasmine.SpyObj<UserService>;
  let ngxUiLoaderService: jasmine.SpyObj<NgxUiLoaderService>;
  let orderService: jasmine.SpyObj<OrderService>;
  let ngxService: jasmine.SpyObj<NgxUiLoaderService>;

  let mockDecodedDetail = {
    uuid: '4bfd1a28-d1de-4295-9171-4b6a26daff76',
    name: 'Shirish Kulkarni',
    email: 'shirishkpl109@gmail.com',
    role: 'User'
  };

  beforeEach(async () => {
    userAuthService = jasmine.createSpyObj('UserAuthService', ['isAdmin', 'isLoggedIn', 'decodedToken']);
    userService = jasmine.createSpyObj('UserService', ['getAllUsers']);
    ngxUiLoaderService = jasmine.createSpyObj('NgxUiLoaderService', ['start', 'stop']);
    orderService = jasmine.createSpyObj('OrderService', ['getUserOrder']);
    ngxService = jasmine.createSpyObj('NgxUiLoaderService', ['start', 'stop']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [OrderComponent],
      providers: [
        { provide: UserAuthService, useValue: userAuthService },
        { provide: UserService, useValue: userService },
        { provide: NgxUiLoaderService, useValue: ngxUiLoaderService },
        { provide: OrderService, useValue: orderService },
        {provide: NgxUiLoaderService, useValue: ngxService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;

    userAuthService.isLoggedIn.and.returnValue(true);
    userAuthService.isAdmin.and.returnValue(false);
    userAuthService.decodedToken.and.returnValue(mockDecodedDetail);
    userService.getAllUsers.and.returnValue(of([]));
    orderService.getUserOrder.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAdmin correctly', () => {
    expect(component.isAdmin).toBeFalse();

    userAuthService.isAdmin.and.returnValue(true);
    component.ngOnInit();
    expect(component.isAdmin).toBeTrue();
  });

  it('should call getUserTransactions and set showButtonGroup to true if isAdmin is false', () => {
    spyOn(component, 'getUserTransactions');
    component.ngOnInit();
    expect(component.getUserTransactions).toHaveBeenCalled();
    expect(component.showButtonGroup).toBeTrue();
  });

  it('should call getAllUsers if isAdmin is true', () => {
    spyOn(component, 'getAllUsers');
    userAuthService.isAdmin.and.returnValue(true);
    component.ngOnInit();
    expect(component.getAllUsers).toHaveBeenCalled();
  });

  it('should call getUserTransactions and set uuidDataToBeFetched correctly', () => {
    const uuid = '4bfd1a28-d1de-4295-9171-4b6a26daff76';
    component.getUserTransactions();
    expect(userAuthService.isLoggedIn).toHaveBeenCalled();
    expect(userAuthService.decodedToken).toHaveBeenCalled();
    expect(component.uuidDataToBeFetched).toEqual(uuid);
  });

  it('should call getTransactions with the correct parameters', () => {
    spyOn(component, 'getTransactions');
    component.getUserTransactions();
    expect(component.getTransactions).toHaveBeenCalledWith('week');
  });



  it('should call getAllUsers and set users and filteredUsers correctly', () => {
    const mockData:any = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    userService.getAllUsers.and.returnValue(of(mockData));
    component.getAllUsers();
    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockData);
    expect(component.filteredUsers).toEqual(mockData);
  });

  it('should handle error if getAllUsers fails', () => {
    const mockError = 'Error fetching users';
    userService.getAllUsers.and.returnValue(throwError(mockError));
    spyOn(console, 'error');
    component.getAllUsers();
    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(mockError);
  });


  it('should filter users based on selectedUser', () => {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Alice Johnson' },
      { id: 4, name: 'Bob Williams' }
    ];
    component.users = users;
    component.selectedUser = 'John Doe';
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0]).toEqual(users[0]);
    expect(component.showTable).toBe(false);
  });

  it('should handle empty selectedUser', () => {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Alice Johnson' },
      { id: 4, name: 'Bob Williams' }
    ];
    component.users = users;
    component.selectedUser = '';
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(users.length);
    expect(component.filteredUsers).toEqual(users);
    expect(component.showTable).toBe(false);
  });


  it('should select user and call getTransactions', () => {
    const name = 'John Doe';
    const uuid = '123456789';
    spyOn(component, 'getTransactions');
    component.selectUser(name, uuid);
    expect(component.selectedUser).toBe(name);
    expect(component.isDropdownOpen).toBe(false);
    expect(component.uuidDataToBeFetched).toBe(uuid);
    expect(component.getTransactions).toHaveBeenCalledWith('week');
  });


  it('should toggle isDropdownOpen when toggleDropdown is called', () => {
    component.isDropdownOpen = false;
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(true);
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(false);
  });


 it('should fetch user data and handle success', fakeAsync(() => {
    const uuid = '123456789';
    const fromDate = '2023-01-01';
    const toDate = '2023-01-07';
    const mockData = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];
    orderService.getUserOrder.and.returnValue(of(mockData));
    component.getUserData(uuid, fromDate, toDate);
    tick(500);
    expect(component.allOrders).toEqual(mockData);
    expect(component.error).toBe(false);
    expect(component.isDropdownOpen).toBe(false);
    expect(component.showTable).toBe(true);
    expect(ngxService.start).toHaveBeenCalled();
    expect(ngxService.stop).toHaveBeenCalled();
  }));

  it('should handle error while fetching user data', fakeAsync(() => {
    const uuid = '123456789';
    const fromDate = '2023-01-01';
    const toDate = '2023-01-07';
    const errorMessage = 'Error fetching user data';
    orderService.getUserOrder.and.returnValue(throwError(errorMessage));
    component.getUserData(uuid, fromDate, toDate);
    tick(500);
    expect(component.allOrders).toEqual([]);
    expect(component.error).toBe(true);
    expect(component.isDropdownOpen).toBe(false);
    expect(component.showButtonGroup).toBe(false);
    expect(ngxService.start).toHaveBeenCalled();
    expect(ngxService.stop).toHaveBeenCalled();
  }));


  it('should show custom period when input is clicked', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#custom');
    inputElement.click();
    expect(component.showCustom).toBe(true);
    expect(component.error).toBe(false);
  });


  it('should hide custom period when week input is clicked', () => {
    const weekInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#week');
    weekInputElement.click();
    expect(component.showCustom).toBe(false);
  });

  it('should hide custom period when month input is clicked', () => {
    const monthInputElement: HTMLInputElement = fixture.nativeElement.querySelector('#month');
    monthInputElement.click();
    expect(component.showCustom).toBe(false);
  });


  it('should set dates and call getUserData() for week period', () => {
    spyOn(component, 'getUserData');
    component.getTransactions('week');
    expect(component.dateError).toBe(false);
    expect(component.fromDate).toBeDefined();
    expect(component.toDate).toBeDefined();
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should set dates and call getUserData() for month period', () => {
    spyOn(component, 'getUserData');
    component.getTransactions('month');
    expect(component.dateError).toBe(false);
    expect(component.fromDate).toBeDefined();
    expect(component.toDate).toBeDefined();
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should set dates and call getUserData() for custom period', () => {
    component.fromDate = '2023-01-01';
    component.toDate = '2023-01-31';
    spyOn(component, 'getUserData');
    component.getTransactions('custom');
    expect(component.dateError).toBe(false);
    expect(component.fromDate).toBe('2023-01-01');
    expect(component.toDate).toBe('2023-01-31');
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should set dateError and customErrorMessage when fromDate or toDate is missing', () => {
    component.fromDate = '';
    component.toDate = '';
    spyOn(component, 'getUserData');
    component.getTransactions('custom');
    expect(component.dateError).toBe(true);
    expect(component.customErrorMessage).toBe('Please select all fields');
    expect(component.getUserData).not.toHaveBeenCalled();
  });

  it('should set dateError and customErrorMessage when fromDate is greater than toDate', () => {
    component.fromDate = '2023-01-02';
    component.toDate = '2023-01-01';
    spyOn(component, 'getUserData');
    component.getTransactions('custom');
    expect(component.dateError).toBe(true);
    expect(component.customErrorMessage).toBe('From date cannot be more than To date');
    expect(component.getUserData).not.toHaveBeenCalled();
  });
});
