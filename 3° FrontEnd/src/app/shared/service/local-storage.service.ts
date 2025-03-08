import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getToken(tokenName: string) {
    return localStorage.getItem(tokenName)
  }

  setToken(tokenName: string, token: string) {
      localStorage.setItem(tokenName, token)
      console.log('Token Add')
  }

  removeToken(tokenName: string) {
      localStorage.removeItem(tokenName)
      localStorage.clear()
      console.log('Token Removido')
  }
}
