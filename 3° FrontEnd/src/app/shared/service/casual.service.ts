import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Classe} from "../model/classe";
import {Observable} from "rxjs";
import {Casual} from "../model/casual";
import {Task} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class CasualService {

  URL_TASK = 'http://localhost:8080/casual';

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<Casual []>{
    return this.httpClient.get<Casual []>(this.URL_TASK);
  }

  inserir(task: Casual): Observable<Casual>{
    return this.httpClient.post<Casual>(this.URL_TASK, task);
  }

  atualizar(task: Casual): Observable<Casual> {
    return this.httpClient.put<Casual>(`${this.URL_TASK}/${task.idtask}`, task);
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_TASK}/${id}`);
  }

  pesquisarPorId(id: number): Observable<Casual> {
    return this.httpClient.get<Casual>(`${this.URL_TASK}/${id}`);
  }
  //============================================================================================
  pesquisarClassePorIdTask(id: number): Observable<Classe> {
    return this.httpClient.get<Classe>(`${this.URL_TASK}/myTask/classe/${id}`);
  }

  getIfDiarias(): Observable<number []> {
    return this.httpClient.get<number []>(`${this.URL_TASK}/getIfDiarias`);
  }

  getIfDiariasPendente(): Observable<Task []> {
    return this.httpClient.get<Casual []>(`${this.URL_TASK}/getIfDiariasPendente`);
  }

  getRequestCasualTask(usuarioID: string): Observable<Task []>{
    return this.httpClient.get<Task []>(`${this.URL_TASK}/requestCasualTask/${usuarioID}`)
  }

  getRequestLate(usuarioID: string | null): Observable<Task []>{
    return this.httpClient.get<Task []>(`${this.URL_TASK}/requestLate/${usuarioID}`)
  }

  getRequestUndefined(usuarioID: string): Observable<Task []>{
    return this.httpClient.get<Task []>(`${this.URL_TASK}/requestUndefined/${usuarioID}`)
  }
  //============================================================================================
}
