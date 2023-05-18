import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ LoginService ]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should send a POST request to the server', () => {
      const mockLoginData = { username: 'test', password: 'password' };
      const expectedResponse = { token: 'abc123' };
      service.login(mockLoginData).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });
      const request = httpMock.expectOne('http://localhost:5000/login');
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(mockLoginData);
      request.flush(expectedResponse);
    });
  });
});
