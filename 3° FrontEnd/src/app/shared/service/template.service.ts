import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Template} from "../model/template"

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  URL_TEMPLATE = `${environment.apiUrl}/template`;
  
  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Template []>{
    return this.httpClient.get<Template []>(this.URL_TEMPLATE);
  }

  inserir(template: Template): Observable<Template>{
    return this.httpClient.post<Template>(this.URL_TEMPLATE, template);
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_TEMPLATE}/${id}`);
  }

  pesquisarPorId(id: number): Observable<Template> {
    return this.httpClient.get<Template>(`${this.URL_TEMPLATE}/${id}`);
  }

  atualizar(template: Template): Observable<Template> {
    return this.httpClient.put<Template>(`${this.URL_TEMPLATE}/${template.idtemplate}`, template);
  }
}
