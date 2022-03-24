import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Task} from "../../shared/model/task";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {CasualService} from "../../shared/service/casual.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ProjetoService} from "../../shared/service/projeto.service";
import {Projeto} from "../../shared/model/projeto";

@Component({
  selector: 'app-task-project',
  templateUrl: './task-project.component.html',
  styleUrls: ['./task-project.component.scss']
})
export class TaskProjectComponent implements OnInit {
  task!: Projeto;
  etiqueta!: string;
  disable: number = 0
  timeout: any = null;
  tempo!: string;
  @Output() submitClicked = new EventEmitter<any>();
  @Output() removedClicked = new EventEmitter<any>();
  atributos: Array<string> = new Array(8)
  titulos: Array<string> =
    ['Infomações', 'Planejamento', 'A Fazer', 'Análise',
     'Pendências', 'Impedimentos', 'Bugs', 'Melhorias']

  constructor(private taskService: ProjetoService, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.taskService.pesquisarPorId(this.data.datakey).subscribe(
      it => {
        this.task = it;
        this.atualizarLista(it);
        if(it.data != null){
          this.tempo = it.data.toString();
        }
        this.etiqueta = this.checkEtiqueta(it.etiqueta);
      }
    )
  }

  counter(qnt: number): Array<number>{
    return new Array<number>(qnt)
  }

  updateTask(): void{
    this.relacionar()
    this.taskService.pesquisarClassePorIdTask(this.task.idtask).subscribe(
      it => {
        this.task.classe = it;
        this.task.data = new Date(this.tempo)
        this.task.data.setMinutes(this.task.data.getMinutes() + this.task.data.getTimezoneOffset());
        this.taskService.atualizar(this.task).subscribe(
          result => {
            this.submitClicked.emit(result)
          }
        )
      }
    )
  }

  removerTask(): void{
    let dialogRef = this.dialog.open(RemovalScreenDialogComponent);
    dialogRef.componentInstance.deleteClick.subscribe(
      result =>{
        this.taskService.remover((this.task.idtask).toString()).subscribe(
          it => this.removedClicked.emit()
        )
      })
  }

  inputDisable(elemento :HTMLElement): void{
    if(this.disable == 0){
      elemento.blur()
      this.disable = 1;
    }
  }

  inputEnable(elemento :HTMLElement): void{
    elemento.focus()
  }

  saveEdit(event: any, tipo: string) {
    clearTimeout(this.timeout);
    const _this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        _this.executeListing(event.target.value, tipo);
      }
    }, 1000);
  }

  private executeListing(value: string, tipo: string) {
    if(value != ''){
      const task = this.task;
      task.nome = value;
      this.taskService.pesquisarClassePorIdTask(task.idtask).subscribe(
        it => {
          task.classe = it;
          this.taskService.atualizar(task).subscribe(
            result => this.submitClicked.emit(result)
          )
        }
      )
    }
  }

  changeEtiqueta(event: any): void{
    const etiqueta = event.target.value;
    if(etiqueta == '\u2714'){
      this.task.etiqueta = 'success'
    }
    else if(etiqueta == '\u274C'){
      this.task.etiqueta = 'problem'
    }
    else{
      this.task.etiqueta = 'undone'
    }
  }

  checkEtiqueta(eqt: string): string{
    if(eqt == 'success'){
      return '\u2714'
    }
    if(eqt == 'problem'){
      return '\u274C'
    }
    return '\u2754'
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  relacionar(): void{
    this.task.information = this.atributos[0]
    this.task.planning = this.atributos[1]
    this.task.fazer = this.atributos[2]
    this.task.analise = this.atributos[3]
    this.task.pendencia = this.atributos[4]
    this.task.impedimentos = this.atributos[5]
    this.task.bugs = this.atributos[6]
    this.task.melhorias = this.atributos[7]
  }

  atualizarLista(task: Projeto): void{
    this.atributos[0] = task.information
    this.atributos[1] = task.planning
    this.atributos[2] = task.fazer
    this.atributos[3] = task.analise
    this.atributos[4] = task.pendencia
    this.atributos[5] = task.impedimentos
    this.atributos[6] = task.bugs
    this.atributos[7] = task.melhorias
  }
}
