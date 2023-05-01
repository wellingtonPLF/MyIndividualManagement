import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Projeto} from "../model/projeto";
import {Classe} from "../model/classe";
import {Task} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  URL_TASK = 'http://localhost:8080/projeto';

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Projeto []>{
    return this.httpClient.get<Projeto []>(this.URL_TASK);
  }

  inserir(task: Projeto): Observable<Projeto>{
    return this.httpClient.post<Projeto>(this.URL_TASK, task);
  }

  atualizar(task: Projeto): Observable<Projeto> {
    return this.httpClient.put<Projeto>(`${this.URL_TASK}/${task.idtask}`, task);
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_TASK}/${id}`);
  }

  pesquisarPorId(id: number): Observable<Projeto> {
    return this.httpClient.get<Projeto>(`${this.URL_TASK}/${id}`);
  }
  //============================================================================================
  pesquisarClassePorIdTask(id: number): Observable<Classe> {
    return this.httpClient.get<Classe>(`${this.URL_TASK}/myTask/classe/${id}`);
  }

  getRequestProjectTask(usuarioID: string | null): Observable<Task []>{
    return this.httpClient.get<Task []>(`${this.URL_TASK}/requestProjectTask/${usuarioID}`)
  }

  getRequestLate(usuarioID: string | null): Observable<Task []>{
    return this.httpClient.get<Task []>(`${this.URL_TASK}/requestLate/${usuarioID}`)
  }

  getRequestUndefined(usuarioID: string | null): Observable<Task []>{
    return this.httpClient.get<Task []>(`${this.URL_TASK}/requestUndefined/${usuarioID}`)
  }
  //============================================================================================
}
