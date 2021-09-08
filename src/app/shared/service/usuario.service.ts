import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Usuario} from "../model/usuario";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_USUARIOS = 'http://localhost:3000/usuarios';

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Usuario []>{
    return this.httpClient.get<Usuario []>(this.URL_USUARIOS);
  }

  inserir(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.URL_USUARIOS, usuario);
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_USUARIOS}/${id}`);
  }

  pesquisarPorId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>('${this.URL_USUARIOS}/${id}');
  }

  pesquisarPorUsuario(usuario: Usuario): Observable<Usuario []> {
    return this.httpClient.get<Usuario []>(this.URL_USUARIOS).pipe(
      map(users=> users.filter(u => u.nome == usuario.nome && u.senha == usuario.senha)));
  }

  atualizar(usuario: Usuario, it: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.URL_USUARIOS}/${usuario.id}`, it);
  }
}
