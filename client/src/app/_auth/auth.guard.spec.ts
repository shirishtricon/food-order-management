import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { UserAuthService } from '../Model/Services/user-auth.service';
import { LoginService } from '../Model/Services/login/login.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let userAuthServiceStub: Partial<UserAuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let loginServiceStub: Partial<LoginService>;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let mockRouterStateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    userAuthServiceStub = {
      getToken: () => 'valid-token'
    };
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    loginServiceStub = {
      roleMatch: (role: string) => role === 'admin'
    };
    mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    mockRouterStateSnapshot = {} as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: UserAuthService, useValue: userAuthServiceStub },
        { provide: Router, useValue: routerSpy },
        { provide: LoginService, useValue: loginServiceStub }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow access for a user with a valid token and matching role (canActivate)', () => {
    mockActivatedRouteSnapshot.data = { roles: ['admin'] };
    const result = guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should deny access for a user with a valid token and non-matching role (canActivate)', () => {
    loginServiceStub.roleMatch = (role: string) => role === 'user';
    mockActivatedRouteSnapshot.data = { roles: ['admin'] };
    const result = guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/forbidden']);
  });

  it('should deny access for a user without a token (canActivate)', () => {
    userAuthServiceStub.getToken = () => null;
    mockActivatedRouteSnapshot.data = { roles: ['admin'] };
    const result = guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should allow access for a user with a valid token and matching role (canActivateChild)', () => {
    mockActivatedRouteSnapshot.data = { roles: ['admin'] };
    const result = guard.canActivateChild(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
