import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "../Model/Services/user-auth.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userAuthService: UserAuthService,
                private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }
        const token = this.userAuthService.getToken();

        const requests: any  = this.addToken(req, token);
        return next.handle(requests).pipe(
            catchError(
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    if(err.status === 401) {
                        this.router.navigate(['/home'])
                    } else if(err.status === 403) {
                        this.router.navigate(['/forbidden'])
                    } else {
                        
                    }
                    return throwError(err);
                }
            )
        );
    }
    
    private addToken(request: HttpRequest<any>, token:string | null) {
        return request.clone(
            {
                setHeaders: {
                    token: `${token}`
                }
            }
        )
    }  
}