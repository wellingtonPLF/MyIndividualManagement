import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
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
    return this.httpClient.get<Template []>(this.URL_TEMPLATE).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  inserir(template: Template): Observable<Template>{
    return this.httpClient.post<Template>(this.URL_TEMPLATE, template).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_TEMPLATE}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  pesquisarPorId(id: number): Observable<Template> {
    return this.httpClient.get<Template>(`${this.URL_TEMPLATE}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  atualizar(template: Template): Observable<Template> {
    return this.httpClient.put<Template>(`${this.URL_TEMPLATE}/${template.idtemplate}`, template).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
}
