import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateEmailService {

  x!: Array<string> | null;

  constructor() { }

  validate(email: string): string{
    this.x = email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
    if(this.x != null){
      return this.x[0]
    }
    else {
      return 'Invalid';
    }
  }
}
