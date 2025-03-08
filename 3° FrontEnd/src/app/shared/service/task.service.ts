import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Task} from "../model/task";
import {Classe} from "../model/classe";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL_TASK: string;

  constructor(private httpClient: HttpClient) {
    this.URL_TASK = `${environment.apiUrl}/task`;
  }

  setApiUrl(newUrl: string) {
    this.URL_TASK = newUrl;
  }

  listar(): Observable<Task []>{
    return this.httpClient.get<Task []>(this.URL_TASK).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  inserir(task: Task): Observable<Task>{
    return this.httpClient.post<Task>(this.URL_TASK, task).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  atualizar(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.URL_TASK}/${task.idtask}`, task).pipe(
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

  pesquisarPorId(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.URL_TASK}/${id}`).pipe(
      map((data: Task | null) => {
        if (!data) {
          throw new Error('Task not found');
        }
        return data;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
