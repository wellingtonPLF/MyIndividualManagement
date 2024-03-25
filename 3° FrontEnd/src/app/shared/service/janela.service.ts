import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../model/usuario";
import {map} from "rxjs/operators";
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
    return this.httpClient.get<Janela []>(this.URL_JANELAS);
  }

  inserir(janela: Janela): Observable<Janela>{
    return this.httpClient.post<Janela>(this.URL_JANELAS, janela);
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_JANELAS}/${id}`);
  }

  pesquisarPorId(id: number): Observable<Janela> {
    return this.httpClient.get<Janela>(`${this.URL_JANELAS}/${id}`);
  }

  pesquisarTemplateByIdJanela(id: number): Observable<Template> {
    return this.httpClient.get<Template>(`${this.URL_JANELAS}/myWindow/template/${id}`);
  }

  pesquisarAtividadeByIdJanela(id: number): Observable<Atividade> {
    return this.httpClient.get<Atividade>(`${this.URL_JANELAS}/myWindow/atividade/${id}`);
  }

  atualizar(janela: Janela): Observable<Janela> {
    return this.httpClient.put<Janela>(`${this.URL_JANELAS}/${janela.idjanela}`, janela);
  }
}
