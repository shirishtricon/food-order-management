import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../../user.model';

describe('UserService', () => {
  let httpMock: HttpTestingController;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a new user', inject([HttpTestingController, UserService],
      (httpMock: HttpTestingController, userService: UserService) => {
        const user: User = {
          emp_id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@example.com',
          password: 'password',
          contact_no: 1234567890
        };

        userService.addUser(user).subscribe(users => {
          expect(users.length).toBe(1);
          expect(users[0]).toEqual(user);
        });

        const req = httpMock.expectOne('http://localhost:5000/user');
        expect(req.request.method).toBe('POST');
        req.flush([user]);
      }));
  });

  describe('getAllUsers', () => {
    it('should return all users', inject([HttpTestingController, UserService],
      (httpMock: HttpTestingController, userService: UserService) => {
        const users: User[] = [
          {
            emp_id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            password: 'password',
            contact_no: 1234567890
          },
          {
            emp_id: 2,
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'janedoe@example.com',
            password: 'password',
            contact_no: 1234567890
          }
        ];

        userService.getAllUsers().subscribe(data => {
          expect(data.length).toBe(2);
          expect(data).toEqual(users);
        });

        const req = httpMock.expectOne('http://localhost:5000/user');
        expect(req.request.method).toBe('GET');
        req.flush(users);
      }));
  });
});

