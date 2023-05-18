import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NavbarComponent } from './navbar.component';
import { UserAuthService } from 'src/app/Model/Services/user-auth.service';
import { DataService } from 'src/app/Model/Services/data.service';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent],
      providers: [UserAuthService, DataService, NgxUiLoaderService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set name if role is "User"', () => {
    const userAuthService = TestBed.inject(UserAuthService);
    spyOn(userAuthService, 'decodedToken').and.returnValue({ role: 'User', name: 'John Doe' });
    component.ngOnInit();
    expect(component.name).toBe('John Doe');
  });

  it('should not set name if role is not "User"', () => {
    const userAuthService = TestBed.inject(UserAuthService);
    spyOn(userAuthService, 'decodedToken').and.returnValue({ role: 'Admin' });
    component.ngOnInit();
    expect(component.name).toBe('');
  });

  it('should return total price from data service', () => {
    const dataService = TestBed.inject(DataService);
    spyOn(dataService, 'getTotalPrice').and.returnValue(100);
    const totalPrice = component.getPrice();
    expect(totalPrice).toBe(100);
  });

  it('should navigate to home on logout', () => {
    const router = TestBed.inject(Router);
    const ngxService = TestBed.inject(NgxUiLoaderService);
    spyOn(router, 'navigate');
    component.logout();  
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should return true if user is logged in', () => {
    const userAuthService = TestBed.inject(UserAuthService);
    spyOn(userAuthService, 'isLoggedIn').and.returnValue(true);
    const isLoggedIn = component.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  it('should return true if user role is "Admin"', () => {
    const userAuthService = TestBed.inject(UserAuthService);
    spyOn(userAuthService, 'decodedToken').and.returnValue({ role: 'Admin' });
    const isAdmin = component.isAdmin();
    expect(isAdmin).toBe(true);
  });

  it('should return false if user role is not "Admin"', () => {
    const userAuthService = TestBed.inject(UserAuthService);
    spyOn(userAuthService, 'decodedToken').and.returnValue({ role: 'User' });
    const isAdmin = component.isAdmin();
    expect(isAdmin).toBe(false);
  });
});
