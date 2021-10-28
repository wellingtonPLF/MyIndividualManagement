import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subarea} from "../model/subarea";

@Injectable({
  providedIn: 'root'
})
export class SubareaService {

  URL_SUBAREA = 'http://localhost:8080/subarea';

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Subarea []>{
    return this.httpClient.get<Subarea []>(this.URL_SUBAREA);
  }

  inserir(subarea: Subarea): Observable<Subarea>{
    return this.httpClient.post<Subarea>(this.URL_SUBAREA, subarea);
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_SUBAREA}/${id}`);
  }

  pesquisarPorId(id: number): Observable<Subarea> {
    return this.httpClient.get<Subarea>(`${this.URL_SUBAREA}/${id}`);
  }

  atualizar(subarea: Subarea): Observable<Subarea> {
    return this.httpClient.put<Subarea>(`${this.URL_SUBAREA}/${subarea.idsubarea}`, subarea);
  }
}
