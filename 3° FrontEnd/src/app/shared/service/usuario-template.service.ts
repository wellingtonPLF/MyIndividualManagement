import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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
    return this.httpClient.get<UsuarioTemplate []>(this.URL_USUARIOS_TEMPLATE);
  }

  inserir(usuarioTemplate: UsuarioTemplate): Observable<UsuarioTemplate>{
    return this.httpClient.post<UsuarioTemplate>(this.URL_USUARIOS_TEMPLATE, usuarioTemplate);
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_USUARIOS_TEMPLATE}/${id}`);
  }

  pesquisarPorId(id: number): Observable<UsuarioTemplate> {
    return this.httpClient.get<UsuarioTemplate>(`${this.URL_USUARIOS_TEMPLATE}/${id}`);
  }

  atualizar(usuarioTemplate: UsuarioTemplate): Observable<UsuarioTemplate> {
    return this.httpClient.put<UsuarioTemplate>(`${this.URL_USUARIOS_TEMPLATE}/${usuarioTemplate.idusuarioTemplate}`, usuarioTemplate);
  }
}

