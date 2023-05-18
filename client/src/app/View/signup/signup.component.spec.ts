import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { SignupComponent } from './signup.component';
import { UserService } from 'src/app/Model/Services/user/user.service';
import { Form } from '@angular/forms';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      declarations: [ SignupComponent ],
      providers: [ UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call userService.addUser when passwords match', () => {
    const form = { value: {
      emp_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      cnfPassword: 'password123',
      contact_no: 1234567890
    }, valid: true };
    spyOn(userService, 'addUser').and.returnValue(of([{ emp_id: 1, first_name: 'John', last_name: 'Doe',email: 'john.doe@example.com',password: 'password123',contact_no: 1234567890}]));
    component.onUserAdd(form as NgForm);
    expect(userService.addUser).toHaveBeenCalledWith({
      emp_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      contact_no: 1234567890
    });
    expect(component.userAdded).toBe('Done');
    
  });

  it('should set userAdded to Error when there is an error in retrieving data', () => {
    const mockError = new Error('Error retrieving data');
    spyOn(userService, 'addUser').and.returnValue(throwError(mockError));
    component.onUserAdd(component.form);
    expect(component.userAdded).toBe('Error');
  });
  

  it('should set userAdded to passwordMismatch when passwords do not match', () => {
    const form:any = { 
      valid: true, 
      value: {
        password: 'password123',
        cnfPassword: 'password'
      },
      reset: () => {}
    };
    component.onUserAdd(form);
    expect(component.userAdded).toBe('passwordMismatch');
  });

  it('should set userAdded to Empty when form is not valid', () => {
    const form:any = { 
      valid: false, 
      value: {},
      reset: () => {}
    };
    component.onUserAdd(form);
    expect(component.userAdded).toBe('Empty');
  });
});
