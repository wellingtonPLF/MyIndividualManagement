import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { catchError, map, Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceGuard {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map(result => {
        if (result) {
          this.router.navigate(['management']);
        }
        else {
          this.router.navigate(['login']);
        }
        return false;
      }),
      catchError(() => {
        return [true];
      })
    );
  }
}
