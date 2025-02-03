import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {UsuarioTemplate} from "../model/usuarioTemplate";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioTemplateService {

  URL_USUARIOS_TEMPLATE = `${environment.apiUrl}/usuarioTemplate`;

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<UsuarioTemplate []>{
    return this.httpClient.get<UsuarioTemplate []>(this.URL_USUARIOS_TEMPLATE).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  inserir(usuarioTemplate: UsuarioTemplate): Observable<UsuarioTemplate>{
    return this.httpClient.post<UsuarioTemplate>(this.URL_USUARIOS_TEMPLATE, usuarioTemplate).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_USUARIOS_TEMPLATE}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  pesquisarPorId(id: number): Observable<UsuarioTemplate> {
    return this.httpClient.get<UsuarioTemplate>(`${this.URL_USUARIOS_TEMPLATE}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  atualizar(usuarioTemplate: UsuarioTemplate): Observable<UsuarioTemplate> {
    return this.httpClient.put<UsuarioTemplate>(`${this.URL_USUARIOS_TEMPLATE}/${usuarioTemplate.idusuarioTemplate}`, usuarioTemplate).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
}

