import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  getToken(): string | null{
    return sessionStorage.getItem('token');
  }

  setToken(token: string): void{
    sessionStorage.setItem('token', token);
  }

  removeToken(token: string): void{
    sessionStorage.removeItem(token);
    sessionStorage.clear();
  }
}
