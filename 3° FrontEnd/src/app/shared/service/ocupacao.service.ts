import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Ocupacao} from "../model/ocupacao";
import {Subarea} from "../model/subarea";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OcupacaoService {

  private URL_OCUPACAO: string;

  constructor(private httpClient: HttpClient) {
    this.URL_OCUPACAO = `${environment.apiUrl}/ocupacao`;
  }

  setApiUrl(newUrl: string) {
    this.URL_OCUPACAO = newUrl;
  }

  listar(): Observable<Ocupacao []>{
    return this.httpClient.get<Ocupacao []>(this.URL_OCUPACAO).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  inserir(ocupacao: Ocupacao): Observable<Ocupacao>{
    return this.httpClient.post<Ocupacao>(this.URL_OCUPACAO, ocupacao).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  remover(id: number): Observable<object> {
    return this.httpClient.delete(`${this.URL_OCUPACAO}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarPorId(id: number): Observable<Ocupacao> {
    return this.httpClient.get<Ocupacao>(`${this.URL_OCUPACAO}/${id}`).pipe(
      map((data: Ocupacao | null) => {
        if (!data) {
          throw new Error('Ocupacao not found');
        }
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarSubareaPorIdOcupacao(id: number): Observable<Subarea>{
    return this.httpClient.get<Subarea>(`${this.URL_OCUPACAO}/subareaByOcupation/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  atualizar(ocupacao: Ocupacao): Observable<Ocupacao> {
    return this.httpClient.put<Ocupacao>(`${this.URL_OCUPACAO}/${ocupacao.idocupacao}`, ocupacao).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
