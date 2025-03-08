import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class CorsInterceptorService implements HttpInterceptor {
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
    const headers = new HttpHeaders({
      'X-CSRF-Token': '{{ csrftoken }}',
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '1'
    });

    const modifiedRequest = request.clone({
      headers: headers,
      withCredentials: true
    });
    return next.handle(modifiedRequest);
  }
}