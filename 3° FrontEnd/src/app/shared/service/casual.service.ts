import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Classe} from "../model/classe";
import {Observable, throwError} from "rxjs";
import {Casual} from "../model/casual";
import {Task} from "../model/task";
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasualService {

  URL_TASK = `${environment.apiUrl}/casual`;

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Casual []>{
    return this.httpClient.get<Casual []>(this.URL_TASK).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  inserir(task: Casual): Observable<Casual>{
    return this.httpClient.post<Casual>(this.URL_TASK, task).pipe(
    catchError( error => {
        return throwError(() => error.error);
      })
    );
  }

  atualizar(task: Casual): Observable<Casual> {
    return this.httpClient.put<Casual>(`${this.URL_TASK}/${task.idtask}`, task).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_TASK}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  pesquisarPorId(id: number): Observable<Casual> {
    return this.httpClient.get<Casual>(`${this.URL_TASK}/${id}`).pipe(
      map((data: Casual | null) => {
        if (!data) {
          throw new Error('Casual not found');
        }
        return data;
      }),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
  //============================================================================================
  pesquisarClassePorIdTask(id: number): Observable<Classe> {
    return this.httpClient.get<Classe>(`${this.URL_TASK}/myTask/classe/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  getIfDiarias(): Observable<number []> {
    return this.httpClient.get<number []>(`${this.URL_TASK}/getIfDiarias`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  getIfDiariasPendente(): Observable<Task []> {
    return this.httpClient.get<Casual []>(`${this.URL_TASK}/getIfDiariasPendente`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  getRequestCasualTask(usuarioID: string): Observable<Task []>{
    return this.httpClient.get<Task []>(`${this.URL_TASK}/requestCasualTask/${usuarioID}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  getRequestLate(usuarioID: string | null): Observable<Task []>{
    return this.httpClient.get<Task []>(`${this.URL_TASK}/requestLate/${usuarioID}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  getRequestUndefined(usuarioID: string): Observable<Task []>{
    return this.httpClient.get<Task []>(`${this.URL_TASK}/requestUndefined/${usuarioID}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
  //============================================================================================
}
