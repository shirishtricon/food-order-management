import { TestBed, inject } from '@angular/core/testing';
import { UserAuthService } from './user-auth.service';

describe('UserAuthService', () => {
  let authService: UserAuthService;
  const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthService]
    });
    authService = TestBed.inject(UserAuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should set and get token from localStorage', () => {
    authService.setToken(jwtToken);
    expect(authService.getToken()).toBe(jwtToken);
  });

  it('should clear token from localStorage', () => {
    authService.setToken(jwtToken);
    authService.clear();
    expect(authService.getToken()).toBeNull();
  });

  it('should return true if token is present', () => {
    authService.setToken(jwtToken);
    expect(authService.isLoggedIn()).toBeTrue();
  });

  it('should return false if token is not present', () => {
    authService.clear();
    expect(authService.isLoggedIn()).toBeFalse();
  });

  it('should return decoded token if token is present', () => {
    authService.setToken(jwtToken);
    const decodedToken = authService.decodedToken();
    expect(decodedToken.sub).toBe('1234567890');
    expect(decodedToken.name).toBe('John Doe');
    expect(decodedToken.iat).toBe(1516239022);
  });

  it('should return null if token is not present', () => {
    authService.clear();
    const decodedToken = authService.decodedToken();
    expect(decodedToken).toBeNull();
  });

  it('should return true if user is an admin', () => {
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    authService.setToken(adminToken);
    expect(authService.isAdmin()).toBeTrue();
  });

  it('should return false if user is not an admin', () => {
    authService.setToken(jwtToken);
    expect(authService.isAdmin()).toBeFalse();
  });
});
