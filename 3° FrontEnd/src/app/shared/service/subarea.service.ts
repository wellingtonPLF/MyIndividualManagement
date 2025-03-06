import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Subarea} from "../model/subarea";
import {Janela} from "../model/janela";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubareaService {

  URL_SUBAREA = `${environment.apiUrl}/subarea`;
  
  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Subarea []>{
    return this.httpClient.get<Subarea []>(this.URL_SUBAREA).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  inserir(subarea: Subarea): Observable<Subarea>{
    return this.httpClient.post<Subarea>(this.URL_SUBAREA, subarea).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  remover(id: number): Observable<object> {
    return this.httpClient.delete(`${this.URL_SUBAREA}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarPorId(id: number): Observable<Subarea> {
    return this.httpClient.get<Subarea>(`${this.URL_SUBAREA}/${id}`).pipe(
      map((data: Subarea | null) => {
        if (!data) {
          throw new Error('Subarea not found');
        }
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarJanelaPorIdSubarea(id: number): Observable<Janela> {
    return this.httpClient.get<Janela>(`${this.URL_SUBAREA}/mySubarea/janela/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  atualizar(subarea: Subarea): Observable<Subarea> {
    return this.httpClient.put<Subarea>(`${this.URL_SUBAREA}/${subarea.idsubarea}`, subarea).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
