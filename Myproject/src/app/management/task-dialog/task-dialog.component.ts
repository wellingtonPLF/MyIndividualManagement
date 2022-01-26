import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {TaskService} from "../../shared/service/task.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Task} from "../../shared/model/task";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  timeout: any = null;
  task!: Task;
  disable: number = 0
  tempo!: string;
  @Output() submitClicked = new EventEmitter<any>();
  @Output() removedClicked = new EventEmitter<any>();

  constructor(private taskService: TaskService, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.taskService.pesquisarPorId(this.data.datakey).subscribe(
      it => {
        this.task = it;
        if(it.data != null){
          this.tempo = it.data.toString();
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
        it => {
          task.classe = it;
          this.taskService.atualizar(task).subscribe(
            result => this.submitClicked.emit(result)
          )
        }
      )
    }
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

  updateTask(): void{
    this.taskService.pesquisarClassePorIdTask(this.task.idtask).subscribe(
      it => {
        this.task.classe = it;
        this.task.data = new Date(this.tempo)
        this.compareTimeToDifficult();
        this.task.data.setMinutes(this.task.data.getMinutes() + this.task.data.getTimezoneOffset());
        this.taskService.atualizar(this.task).subscribe(
          result => {
            this.submitClicked.emit(result)
          }
        )
      }
    )
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

  compareTimeToDifficult(): void{
    const today = new Date();
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
  }
}
