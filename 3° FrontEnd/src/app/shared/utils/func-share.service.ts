import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FuncShareService {

  private subject = new Subject<any>();

  sendClickEvent(value?: any) {
    this.subject.next(value);
  }
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }

}
