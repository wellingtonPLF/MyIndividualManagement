import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  setToken(token: string): void{
    localStorage.setItem('token', token);
    console.log("Token Add");
  }

  removeToken(token: string): void{
    localStorage.removeItem(token);
    localStorage.clear();
    console.log("Token Removido");
  }
}
