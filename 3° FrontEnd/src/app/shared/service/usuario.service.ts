import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Usuario} from "../model/usuario";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

import { environment } from '../../../environments/environment';
import { StatusResult } from '../interfaces/I_StatusResult';
import { UserResponse } from '../types/system';
import { Authentication } from '../model/authentication';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_USUARIOS = `${environment.apiUrl}/usuarios`;

  constructor(private httpClient: HttpClient) {
    this.URL_USUARIOS = `${environment.apiUrl}/usuarios`;
  }

  setApiUrl(newUrl: string) {
    this.URL_USUARIOS = newUrl;
  }

  listar(): Observable<Usuario []>{
    return this.httpClient.get<Usuario []>(this.URL_USUARIOS).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  inserir(authentication: Authentication): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.URL_USUARIOS, Authentication.refract(authentication)).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_USUARIOS}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarPorId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.URL_USUARIOS}/${id}`).pipe(
      map((data: Usuario | null) => {
        if (!data) {
          throw new Error('Usuario not found');
        }
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  checkLimit(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.URL_USUARIOS}/checkLimit`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getUsuarioByNome(nome: String): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.URL_USUARIOS}/myuser/${nome}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getAuthenticatedUser(): Observable<StatusResult<UserResponse>>{
    return this.httpClient.get<StatusResult<UserResponse>>(`${this.URL_USUARIOS}/getUser`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    console.log(usuario)
    return this.httpClient.put<Usuario>(`${this.URL_USUARIOS}/${usuario.idusuario}`, usuario).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
