import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Model/Services/user-auth.service';
import { LoginService } from 'src/app/Model/Services/login/login.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of, throwError  } from 'rxjs';


class MockLoginService {
  login() {
    return throwError({ error: { message: 'Test error message' } });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let router: Router;
  let loginService: LoginService;
  let userAuthService: UserAuthService;
  let ngxService: NgxUiLoaderService;
  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useClass: MockLoginService },
        UserAuthService,
        Router,
        NgxUiLoaderService,
      ],
      
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    loginService = TestBed.inject(LoginService);
    ngxService = TestBed.inject(NgxUiLoaderService);
    userAuthService = TestBed.inject(UserAuthService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onLogin function when login button is clicked', fakeAsync(() => {
    spyOn(component, 'onLogin');
    const loginButton = fixture.nativeElement.querySelector('#submit'); // Assuming the login button's ID is 'submit'
    loginButton.click();
    tick();
    expect(component.onLogin).toHaveBeenCalled();
  }));
  

  it('should navigate to admin route if admin details are matching', fakeAsync(() => {
    const validForm = {
      value: {
        email: 'admin@example.com',
        password: 'password',
        role: 'Admin'
      },
      valid: true
    };
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(loginService, 'login').and.returnValue(of({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMDkzMWU4OTEtZjk1NC00ZjNlLTkzNWQtOGVhNDY4YWNmZmNmIiwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2ODQxNTU2NDMsImV4cCI6MTY4NDE1NzQ0M30.XUeK6At5E06zfJZFpIRSBeOnQaJggygZuvYsXW-UtQo' }));
    component.onLogin(validForm);
    tick(2000);
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/categories']);
    flush()
  }));

  it('should navigate to user route if user details are matching', fakeAsync(() => {
    const validForm = {
      value: {
        email: 'user@example.com',
        password: 'password',
        role: 'User'
      },
      valid: true
    };
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(loginService, 'login').and.returnValue(of({ token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE2ODQxNTQwOTMsImV4cCI6MTcxNTY5MjE1MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInV1aWQiOiI0YmZkMWEyOC1kMWRlLTQyOTUtOTE3MS00YjZhMjZkYWZmNzYiLCJuYW1lIjoiU2hpcmlzaCBLdWxrYXJuaSIsImVtYWlsIjoic2hpcmlzaGtwbDEwOUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciJ9.rXrH57ab_JlJmyHQeXIP324fKTLLDMXNN9wcDxgRvl8'}));
    spyOn(userAuthService, 'decodedToken').and.returnValue({ role: 'User' });
    component.onLogin(validForm);
    tick(2000);
    expect(navigateSpy).toHaveBeenCalledWith(['/user/categories']);
    flush()
  }));

  it('should set the message flag to the error message if an error occurs during login', () => {
    spyOn(loginService, 'login').and.returnValue(throwError({ error: { message: 'Test error message' } }));
    const form = {
      valid: true,
      value: { email:'someting@something.com', password: 'nothing' },
    };
    component.onLogin(form);
    expect(component.message).toEqual('Test error message');
  });

  it('should set the message flag to "Enter all details" and call openModal() if no details are provided', () => {
    const form = {
      valid: false,
    };
    spyOn(component, 'openModal');
    component.onLogin(form);
    expect(component.message).toEqual('Enter All Details');
    expect(component.openModal).toHaveBeenCalled();
  });
});

