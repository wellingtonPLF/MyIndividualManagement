import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Projeto} from "../model/projeto";
import {Classe} from "../model/classe";
import {Task} from "../model/task";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
  
  private URL_TASK: string;

  constructor(private httpClient: HttpClient) {
    this.URL_TASK = `${environment.apiUrl}/projeto`;
  }

  setApiUrl(newUrl: string) {
    this.URL_TASK = newUrl;
  }

  listar(): Observable<Projeto []>{
    return this.httpClient.get<Projeto []>(this.URL_TASK).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  inserir(task: Projeto): Observable<Projeto>{
    return this.httpClient.post<Projeto>(this.URL_TASK, task).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  atualizar(task: Projeto): Observable<Projeto> {
    return this.httpClient.put<Projeto>(`${this.URL_TASK}/${task.idtask}`, task).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_TASK}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  pesquisarPorId(id: number): Observable<Projeto> {
    return this.httpClient.get<Projeto>(`${this.URL_TASK}/${id}`).pipe(
      map((data: Projeto | null) => {
        if (!data) {
          throw new Error('Projeto not found');
        }
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  //============================================================================================
  pesquisarClassePorIdTask(id: number): Observable<Classe> {
    return this.httpClient.get<Classe>(`${this.URL_TASK}/myTask/classe/${id}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getRequestProjectTask(usuarioID: string | null): Observable<Task []>{
    return this.httpClient.get<Task []>(`${this.URL_TASK}/requestProjectTask/${usuarioID}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getRequestLate(usuarioID: string | null): Observable<Task []>{
    return this.httpClient.get<Task []>(`${this.URL_TASK}/requestLate/${usuarioID}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getRequestUndefined(usuarioID: string | null): Observable<Task []>{
    return this.httpClient.get<Task []>(`${this.URL_TASK}/requestUndefined/${usuarioID}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  //============================================================================================
}
