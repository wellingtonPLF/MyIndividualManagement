import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  getData(dirName: string, jsonFile: string): Observable<any> {
    const dir_path = `${window.location.protocol}//${window.location.host}/assets/${dirName ? dirName + "/": ''}${jsonFile}.json`
    return this.http.get<any>(dir_path);
  }
}
