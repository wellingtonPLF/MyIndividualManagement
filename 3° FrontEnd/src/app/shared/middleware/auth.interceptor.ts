import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, mergeMap, Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { ErrorResult } from '../interfaces/I_ErrorResult';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({ withCredentials: true });
    
    return next.handle(modifiedRequest).pipe(
      catchError( (error) => {
        if(error.status == 401 && error.error.type === "EXPIRED_AT") {
          return this.authService.refreshToken().pipe(
            mergeMap(() => {
              return next.handle(modifiedRequest);
            }),
            catchError((msg: ErrorResult<String>) => {
              if (msg.type != undefined){
                return this.authService.logOut().pipe(
                  mergeMap (() => {
                    return next.handle(modifiedRequest);
                  }),
                  catchError((error) => {
                    return throwError(() => error);
                  })
                )
              }
              return throwError(() => error);          
            })
          );
        }
        else {
          return throwError(() => error);
        }
      })
    );
  }
}
