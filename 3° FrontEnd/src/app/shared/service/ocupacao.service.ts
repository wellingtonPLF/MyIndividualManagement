import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ocupacao} from "../model/ocupacao";
import {Subarea} from "../model/subarea";

@Injectable({
  providedIn: 'root'
})
export class OcupacaoService {

  URL_OCUPACAO = 'http://localhost:8080/ocupacao';

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Ocupacao []>{
    return this.httpClient.get<Ocupacao []>(this.URL_OCUPACAO);
  }

  inserir(ocupacao: Ocupacao): Observable<Ocupacao>{
    return this.httpClient.post<Ocupacao>(this.URL_OCUPACAO, ocupacao);
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_OCUPACAO}/${id}`);
  }

  pesquisarPorId(id: number): Observable<Ocupacao> {
    return this.httpClient.get<Ocupacao>(`${this.URL_OCUPACAO}/${id}`);
  }

  pesquisarSubareaPorIdOcupacao(id: number): Observable<Subarea>{
    return this.httpClient.get<Subarea>(`${this.URL_OCUPACAO}/subareaByOcupation/${id}`);
  }

  atualizar(ocupacao: Ocupacao): Observable<Ocupacao> {
    return this.httpClient.put<Ocupacao>(`${this.URL_OCUPACAO}/${ocupacao.idocupacao}`, ocupacao);
  }
}
