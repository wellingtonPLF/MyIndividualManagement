import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  constructor() { }

  getToken(): string | null{
    return window.sessionStorage.getItem('token');
  }

  setToken(token: string): void{
    window.sessionStorage.setItem('token', token);
    console.log("Token Add");
  }

  removeToken(token: string): void{
    window.sessionStorage.removeItem(token);
    window.sessionStorage.clear();
    console.log("Token Removido");
  }
}
