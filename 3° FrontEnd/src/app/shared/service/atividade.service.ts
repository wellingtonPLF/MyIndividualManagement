import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Usuario} from "../model/usuario";
import {Atividade} from "../model/atividade";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  private URL_ATIVIDADE: string;

  constructor(private httpClient: HttpClient) {
    this.URL_ATIVIDADE = `${environment.apiUrl}/atividade`;
  }

  setApiUrl(newUrl: string) {
    this.URL_ATIVIDADE = newUrl;
  }

  listar(): Observable<Atividade []>{
    return this.httpClient.get<Atividade []>(this.URL_ATIVIDADE).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  inserir(atividade: Atividade): Observable<Atividade> {
    // const x = { auth: atividade, user: atividade.usuario!.idusuario };
    const x = atividade;
    return this.httpClient.post<Atividade>(this.URL_ATIVIDADE, x).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  remover(id: number): Observable<object> {
    return this.httpClient.delete(`${this.URL_ATIVIDADE}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarPorId(id: number): Observable<Atividade> {
    return this.httpClient.get<Atividade>(`${this.URL_ATIVIDADE}/${id}`).pipe(
      map((data: Atividade | null) => {
        if (!data) {
          throw new Error('Atividade not found');
        }
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarUsuarioPorIdAtividade(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.URL_ATIVIDADE}/myActivity/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  atualizar(atividade: Atividade): Observable<Atividade> {
    return this.httpClient.put<Atividade>(`${this.URL_ATIVIDADE}/${atividade.idatividade}`, atividade).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
