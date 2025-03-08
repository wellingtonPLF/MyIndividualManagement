import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Template} from "../model/template"

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private URL_TEMPLATE: string;

  constructor(private httpClient: HttpClient) {
    this.URL_TEMPLATE = `${environment.apiUrl}/template`;
  }

  setApiUrl(newUrl: string) {
    this.URL_TEMPLATE = newUrl;
  }

  listar(): Observable<Template []>{
    return this.httpClient.get<Template []>(this.URL_TEMPLATE).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  inserir(template: Template): Observable<Template>{
    return this.httpClient.post<Template>(this.URL_TEMPLATE, template).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_TEMPLATE}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarPorId(id: number): Observable<Template> {
    return this.httpClient.get<Template>(`${this.URL_TEMPLATE}/${id}`).pipe(
      map((data: Template | null) => {
        if (!data) {
          throw new Error('Template not found');
        }
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  atualizar(template: Template): Observable<Template> {
    return this.httpClient.put<Template>(`${this.URL_TEMPLATE}/${template.idtemplate}`, template).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
