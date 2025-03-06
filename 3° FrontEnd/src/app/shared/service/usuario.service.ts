import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Usuario} from "../model/usuario";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

import { environment } from '../../../environments/environment';
import { StatusResult } from '../interfaces/I_StatusResult';
import { UserResponse } from '../types/system';
import { Auth } from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_USUARIOS = `${environment.apiUrl}/usuarios`;

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Usuario []>{
    return this.httpClient.get<Usuario []>(this.URL_USUARIOS).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  inserir(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.URL_USUARIOS, usuario).pipe(
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
    return this.httpClient.put<Usuario>(`${this.URL_USUARIOS}/${usuario.idusuario}`, usuario).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
