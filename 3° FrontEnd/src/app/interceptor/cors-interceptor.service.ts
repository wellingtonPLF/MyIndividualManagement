import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.prod';

@Injectable()
export class CorsInterceptorService implements HttpInterceptor {
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const headers = new HttpHeaders({
      'X-CSRF-Token': '{{ csrftoken }}',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.apiUrl
    });

    const modifiedRequest = request.clone({
      headers: headers,
      withCredentials: true
    });
    return next.handle(modifiedRequest);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptorService, multi: true }
];