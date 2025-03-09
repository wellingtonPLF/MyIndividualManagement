import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  
  constructor(private authService: AuthService, private router: Router){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn().pipe(
      map(
        (it: boolean) => {
          if (it){
            return true
          }
          else{
            this.router.navigate(['login']);
            return false
          }
        }
      ),
      catchError(() => {
        this.router.navigate(['/']);
        return [false];
      })
    )
  }
}
