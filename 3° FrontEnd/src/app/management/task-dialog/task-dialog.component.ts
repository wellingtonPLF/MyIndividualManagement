import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {TaskService} from "../../shared/service/task.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Task} from "../../shared/model/task";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {Casual} from "../../shared/model/casual";
import {CasualService} from "../../shared/service/casual.service";
import { DataService } from 'src/app/shared/service/data.service';
import { TaskFactory } from 'src/app/shared/factoryDirectory/taskFactory';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  timeout: any = null;
  task!: Casual;
  disable: number = 0
  etiqueta!: string;
  tempo!: string;
  @Output() submitClicked = new EventEmitter<any>();
  @Output() removedClicked = new EventEmitter<any>();

  constructor(private taskService: CasualService, private dialog: MatDialog, private dataService: DataService, 
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const task = this.data.key.casual[this.data.datakey]
    this.taskService.pesquisarPorId(task.idtask).subscribe(
      {
        next: it => {
          this.task = it;
          if(it.data != null){
            this.tempo = it.data.toString();
          }
          this.etiqueta = this.checkEtiqueta(it.etiqueta);
      },
        error: _ => {
          this.task = {...task}
          if(task.data != null){
            this.tempo = task.data.toISOString().slice(0,10);
          }
          this.etiqueta = this.checkEtiqueta(task.etiqueta);
        }
      }
    )
  }

  saveEdit(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.executeListing(event.target.value);
      }
    }, 2000);
  }

  private executeListing(value: string) {
    if(value != ''){
      const task = this.task;
      task.nome = value;
      this.taskService.pesquisarClassePorIdTask(task.idtask).subscribe(
        {
          next: it => {
          task.classe = it;
          this.taskService.atualizar(task).subscribe(
            result => this.submitClicked.emit(result)
          )
        },
        error: _ => {
          this.task = task;
        }
      })
    }
  }

  removerTask(): void{
    let dialogRef = this.dialog.open(RemovalScreenDialogComponent);
    dialogRef.componentInstance.deleteClick.subscribe(
      _ => {
        this.taskService.remover((this.task.idtask).toString()).subscribe(
        {
          next: (x: any) => {
            this.removedClicked.emit()
          }, error: (result: any) => {
            this.removedClicked.emit()
          }
        }
      )
    })
  }

  updateTask(): void {
    this.taskService.pesquisarClassePorIdTask(this.task.idtask).subscribe(
      {
        next: it => {
        this.task.classe = it;
        this.taskService.getIfDiarias().subscribe(
          response => {
            if(response.includes(this.task.idtask) && this.task.etiqueta == 'success'){
              this.task.data = new Date('');
              this.task.etiqueta = 'undone';
            }
            else{
              this.task.data = new Date(this.tempo)
            }
            //this.compareTimeToDifficult();
            this.task.data.setMinutes(this.task.data.getMinutes() + this.task.data.getTimezoneOffset());
            this.taskService.atualizar(this.task).subscribe(
              result => {
                this.submitClicked.emit(result)
              }
            )
          }
        )
      },
      error: _ => {
        const task = {...this.task}
        task.data = new Date(this.tempo)
        this.submitClicked.emit(task)
      }
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

  checkEtiqueta(eqt: string): string{
    if(eqt == 'success'){
      return '\u2714'
    }
    if(eqt == 'problem'){
      return '\u274C'
    }
    return '\u2754'
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

  /*
  compareTimeToDifficult(): void{
    /*const today = new Date();
    const dataAtual = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    if(Date.parse(dataAtual +' '+ this.task.tempo) <= Date.parse(dataAtual +' '+'01:00:00')){
      this.task.dificuldade = 'easy'
    }
    else if (Date.parse(dataAtual +' '+ this.task.tempo) <= Date.parse(dataAtual +' '+ '03:00:00')){
      this.task.dificuldade = 'medium'
    }
    else if (Date.parse(dataAtual +' '+ this.task.tempo) <= Date.parse(dataAtual +' '+ '06:00:00')){
      this.task.dificuldade = 'hard'
    }
    else{
      this.task.dificuldade = 'extreme'
    }
    if (this.task.dificuldade == "easy"){
      this.task.tempo = "01:00:00";
    }
    else if(this.task.dificuldade == "medimum"){
      this.task.tempo = "03:00:00";
    }
    else if(this.task.dificuldade == "hard"){
      this.task.tempo = "06:00:00";
    }
    else if(this.task.dificuldade == "expert"){
      this.task.tempo = "12:00:00";
    }
    else if(this.task.dificuldade == "master"){
      this.task.tempo = "75:00:00";
    }
  }*/
}
