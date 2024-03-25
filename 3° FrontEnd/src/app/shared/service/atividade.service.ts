import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../model/usuario";
import {Atividade} from "../model/atividade";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  URL_ATIVIDADE = `${environment.apiUrl}/atividade`;

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Atividade []>{
    return this.httpClient.get<Atividade []>(this.URL_ATIVIDADE);
  }

  inserir(atividade: Atividade): Observable<Atividade>{
    return this.httpClient.post<Atividade>(this.URL_ATIVIDADE, atividade);
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_ATIVIDADE}/${id}`);
  }

  pesquisarPorId(id: number): Observable<Atividade> {
    return this.httpClient.get<Atividade>(`${this.URL_ATIVIDADE}/${id}`);
  }

  pesquisarUsuarioPorIdAtividade(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.URL_ATIVIDADE}/myActivity/${id}`);
  }

  atualizar(atividade: Atividade): Observable<Atividade> {
    return this.httpClient.put<Atividade>(`${this.URL_ATIVIDADE}/${atividade.idatividade}`, atividade);
  }
}
