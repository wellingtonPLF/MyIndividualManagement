import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceGuard {
  constructor(private router: Router, private usuarioService: UsuarioService) {
  }

  canActivate(): Observable<boolean> {
    return this.usuarioService.isLoggedIn().pipe(
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
