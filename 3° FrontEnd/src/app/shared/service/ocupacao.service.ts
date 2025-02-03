import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Ocupacao} from "../model/ocupacao";
import {Subarea} from "../model/subarea";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OcupacaoService {

  URL_OCUPACAO = `${environment.apiUrl}/ocupacao`;

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Ocupacao []>{
    return this.httpClient.get<Ocupacao []>(this.URL_OCUPACAO).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  inserir(ocupacao: Ocupacao): Observable<Ocupacao>{
    return this.httpClient.post<Ocupacao>(this.URL_OCUPACAO, ocupacao).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_OCUPACAO}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  pesquisarPorId(id: number): Observable<Ocupacao> {
    return this.httpClient.get<Ocupacao>(`${this.URL_OCUPACAO}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  pesquisarSubareaPorIdOcupacao(id: number): Observable<Subarea>{
    return this.httpClient.get<Subarea>(`${this.URL_OCUPACAO}/subareaByOcupation/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  atualizar(ocupacao: Ocupacao): Observable<Ocupacao> {
    return this.httpClient.put<Ocupacao>(`${this.URL_OCUPACAO}/${ocupacao.idocupacao}`, ocupacao).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
}
