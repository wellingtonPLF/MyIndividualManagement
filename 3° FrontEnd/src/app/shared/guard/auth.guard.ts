import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {SessionStorageService} from "../service/session-storage.service";
import {LocalStorageService} from "../service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router,
              private accountManagement: SessionStorageService,
              private accountServiceLocal: LocalStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const tokenS = this.accountManagement.getToken();
    const tokenL = this.accountServiceLocal.getToken();
    if(tokenS || tokenL){
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }
  }
}
