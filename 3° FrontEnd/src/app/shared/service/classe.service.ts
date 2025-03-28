import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Classe} from "../model/classe";
import {Ocupacao} from "../model/ocupacao";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private URL_CLASSE: string;

  constructor(private httpClient: HttpClient) {
    this.URL_CLASSE = `${environment.apiUrl}/classe`;
  }

  setApiUrl(newUrl: string) {
    this.URL_CLASSE = newUrl;
  }

  listar(): Observable<Classe []>{
    return this.httpClient.get<Classe []>(this.URL_CLASSE).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  inserir(classe: Classe): Observable<Classe>{
    return this.httpClient.post<Classe>(this.URL_CLASSE, classe).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_CLASSE}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarPorId(id: number): Observable<Classe> {
    return this.httpClient.get<Classe>(`${this.URL_CLASSE}/${id}`).pipe(
      map((data: Classe | null) => {
        if (!data) {
          throw new Error('Classe not found');
        }
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarOcupacaoPorIdClasse(id: number): Observable<Ocupacao> {
    return this.httpClient.get<Ocupacao>(`${this.URL_CLASSE}/myClasse/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarTipoPorIdClasse(id: number): Observable<string> {
    return this.httpClient.get<string>(`${this.URL_CLASSE}/myTipo/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  atualizar(classe: Classe): Observable<Classe> {
    return this.httpClient.put<Classe>(`${this.URL_CLASSE}/${classe.idclasse}`, classe).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
