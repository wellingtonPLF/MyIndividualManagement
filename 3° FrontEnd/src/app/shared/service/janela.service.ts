import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Usuario} from "../model/usuario";
import {catchError, map} from "rxjs/operators";
import {Janela} from "../model/janela";
import {Template} from "../model/template";
import {Atividade} from "../model/atividade";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JanelaService {

  URL_JANELAS = `${environment.apiUrl}/janela`;

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Janela []>{
    return this.httpClient.get<Janela []>(this.URL_JANELAS).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  inserir(janela: Janela): Observable<Janela>{
    return this.httpClient.post<Janela>(this.URL_JANELAS, janela).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  remover(id: number): Observable<object> {
    return this.httpClient.delete(`${this.URL_JANELAS}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  pesquisarPorId(id: number): Observable<Janela> {
    return this.httpClient.get<Janela>(`${this.URL_JANELAS}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  pesquisarTemplateByIdJanela(id: number): Observable<Template> {
    return this.httpClient.get<Template>(`${this.URL_JANELAS}/myWindow/template/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  pesquisarAtividadeByIdJanela(id: number): Observable<Atividade> {
    return this.httpClient.get<Atividade>(`${this.URL_JANELAS}/myWindow/atividade/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  atualizar(janela: Janela): Observable<Janela> {
    return this.httpClient.put<Janela>(`${this.URL_JANELAS}/${janela.idjanela}`, janela).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
}
