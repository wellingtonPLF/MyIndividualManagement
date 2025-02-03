import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Usuario} from "../model/usuario";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_USUARIOS = `${environment.apiUrl}/usuario`;

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Usuario []>{
    return this.httpClient.get<Usuario []>(this.URL_USUARIOS).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  inserir(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.URL_USUARIOS, usuario).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_USUARIOS}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  pesquisarPorId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.URL_USUARIOS}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  checkLimit(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.URL_USUARIOS}/checkLimit`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  getUsuarioByNome(nome: String): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.URL_USUARIOS}/myuser/${nome}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  pesquisarPorValidacao(usuario: Usuario): Observable<Usuario []>{
    return this.httpClient.get<Usuario []>(this.URL_USUARIOS).pipe(
      map(users=> users.filter(u => u.email == usuario.email || u.nome == usuario.nome)));
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.URL_USUARIOS}/${usuario.idusuario}`, usuario).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
}
