import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Task} from "../model/task";
import {Classe} from "../model/classe";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  URL_TASK = `${environment.apiUrl}/task`;

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Task []>{
    return this.httpClient.get<Task []>(this.URL_TASK).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  inserir(task: Task): Observable<Task>{
    return this.httpClient.post<Task>(this.URL_TASK, task).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  atualizar(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.URL_TASK}/${task.idtask}`, task).pipe(
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

  pesquisarPorId(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.URL_TASK}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
}
