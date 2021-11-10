import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Classe} from "../model/classe";
import {Ocupacao} from "../model/ocupacao";

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  URL_CLASSE = 'http://localhost:8080/classe';

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Classe []>{
    return this.httpClient.get<Classe []>(this.URL_CLASSE);
  }

  inserir(classe: Classe): Observable<Classe>{
    return this.httpClient.post<Classe>(this.URL_CLASSE, classe);
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_CLASSE}/${id}`);
  }

  pesquisarPorId(id: number): Observable<Classe> {
    return this.httpClient.get<Classe>(`${this.URL_CLASSE}/${id}`);
  }

  pesquisarOcupacaoPorIdClasse(id: number): Observable<Ocupacao> {
    return this.httpClient.get<Ocupacao>(`${this.URL_CLASSE}/myClasse/${id}`);
  }

  atualizar(classe: Classe): Observable<Classe> {
    return this.httpClient.put<Classe>(`${this.URL_CLASSE}/${classe.idclasse}`, classe);
  }
}
