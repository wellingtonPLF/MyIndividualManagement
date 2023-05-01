import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../model/task";
import {Classe} from "../model/classe";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  URL_TASK = 'http://localhost:8080/task';

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Task []>{
    return this.httpClient.get<Task []>(this.URL_TASK);
  }

  inserir(task: Task): Observable<Task>{
    return this.httpClient.post<Task>(this.URL_TASK, task);
  }

  atualizar(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.URL_TASK}/${task.idtask}`, task);
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_TASK}/${id}`);
  }

  pesquisarPorId(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.URL_TASK}/${id}`);
  }
}
