import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsuarioService } from '../service/usuario.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LimitGuardGuard {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.usuarioService.checkLimit().pipe(
      map( it => {
        if (it) {
          return true
        }
        else {
          this.router.navigate(['outlimit']);
          return false
        }
      }),
      catchError(_ => {
        this.router.navigate(['outlimit']);
        return of(false);
      })
    );
  }
  
}
