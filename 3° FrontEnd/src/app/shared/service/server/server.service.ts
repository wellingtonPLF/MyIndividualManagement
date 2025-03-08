import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatusResult } from '../../interfaces/I_StatusResult';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private URL_SERVER: string;

  constructor(private httpClient: HttpClient) {
    this.URL_SERVER = `${environment.apiUrl}/`;
  }

  setApiUrl(newUrl: string) {
    this.URL_SERVER = newUrl;
  }

  getInfo(): Observable<StatusResult<string>>{
    return this.httpClient.get<StatusResult<string>>(this.URL_SERVER).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
