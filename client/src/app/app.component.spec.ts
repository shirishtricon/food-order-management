import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserAuthService } from './Model/Services/user-auth.service';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let userAuthService: UserAuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AppComponent ],
      providers: [ UserAuthService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    userAuthService = TestBed.inject(UserAuthService);
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'client'`, () => {
    expect(component.title).toEqual('client');
  });

  it('should navigate to login page if user is not logged in', () => {
    spyOn(userAuthService, 'isLoggedIn').and.returnValue(false);
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to categories page if user is logged in', () => {
    spyOn(userAuthService, 'isLoggedIn').and.returnValue(true);
    spyOn(userAuthService, 'decodedToken').and.returnValue({exp: new Date().getTime()/1000 + 10000, role: 'ADMIN'});
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/admin/categories']);
  });

  it('should remove token from local storage if token is expired', () => {
    spyOn(userAuthService, 'decodedToken').and.returnValue({exp: new Date().getTime()/1000 - 10000});
    spyOn(localStorage, 'removeItem');
    component.ngOnInit();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });

  it('should navigate to home page if there is no decoded token', () => {
    spyOn(userAuthService, 'decodedToken').and.returnValue(null);
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

});
