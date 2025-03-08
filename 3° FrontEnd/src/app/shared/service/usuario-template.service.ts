import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {UsuarioTemplate} from "../model/usuarioTemplate";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioTemplateService {

  private URL_USUARIOS_TEMPLATE: string;

  constructor(private httpClient: HttpClient) {
    this.URL_USUARIOS_TEMPLATE = `${environment.apiUrl}/usuarioTemplate`;
  }

  setApiUrl(newUrl: string) {
    this.URL_USUARIOS_TEMPLATE = newUrl;
  }

  listar(): Observable<UsuarioTemplate []>{
    return this.httpClient.get<UsuarioTemplate []>(this.URL_USUARIOS_TEMPLATE).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  inserir(usuarioTemplate: UsuarioTemplate): Observable<UsuarioTemplate>{
    return this.httpClient.post<UsuarioTemplate>(this.URL_USUARIOS_TEMPLATE, usuarioTemplate).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_USUARIOS_TEMPLATE}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarPorId(id: number): Observable<UsuarioTemplate> {
    return this.httpClient.get<UsuarioTemplate>(`${this.URL_USUARIOS_TEMPLATE}/${id}`).pipe(
      map((data: UsuarioTemplate | null) => {
        if (!data) {
          throw new Error('usuarioTemplate not found');
        }
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  atualizar(usuarioTemplate: UsuarioTemplate): Observable<UsuarioTemplate> {
    return this.httpClient.put<UsuarioTemplate>(`${this.URL_USUARIOS_TEMPLATE}/${usuarioTemplate.idusuarioTemplate}`, usuarioTemplate).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}

