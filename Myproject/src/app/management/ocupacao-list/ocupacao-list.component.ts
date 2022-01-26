import {Component, Input, OnInit} from '@angular/core';
import {Subarea} from "../../shared/model/subarea";
import {Ocupacao} from "../../shared/model/ocupacao";
import {OcupacaoService} from "../../shared/service/ocupacao.service";
import {MatDialog} from "@angular/material/dialog";
import {ClasseService} from "../../shared/service/classe.service";
import {TemplateService} from "../../shared/service/template.service";
import {SubareaService} from "../../shared/service/subarea.service";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {TaskService} from "../../shared/service/task.service";

@Component({
  selector: 'app-ocupacao-list',
  templateUrl: './ocupacao-list.component.html',
  styleUrls: ['./ocupacao-list.component.scss']
})
export class OcupacaoListComponent implements OnInit {
  show: number | undefined = 0;
  @Input() subarea!: Subarea;
  ocupacoes!: Array<Ocupacao>;
  lista: Array<any> = [];
  timeout: any = null;

  constructor(private ocupacaoService: OcupacaoService, private taskService: TaskService,
              private dialog: MatDialog, private classService: ClasseService,
              private templateService: TemplateService, private subareaService: SubareaService) {

  }

  ngOnInit(): void {
    this.taskService.getRequestAll().subscribe(
      it => {
        this.lista[0] = it;
      }
    )
    this.taskService.getRequestLate().subscribe(
      it => {
        this.lista[1] = it;
      }
    )
    this.taskService.getRequestUndefined().subscribe(
      it => {
        this.lista[2] = it;
      }
    )
  }

  ngOnChanges(): void{
    if(this.subarea != undefined){
      this.subareaService.pesquisarPorId(this.subarea.idsubarea).subscribe(
        it => {
          this.ocupacoes =  OrdemDependency.ordenar(it.ocupacoes);
        }
      )
    }
  }

  showClasse(index: number): void{
    if(this.show == index){
      this.show = undefined;
    }
    else{
      this.show = index;
    }
  }

  saveEdit(event: any, i: number) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.execListing(event.target.value, i);
      }
    }, 2000);
  }

  private execListing(value: string, index: number) {
    if(value != ''){
      this.classService.pesquisarPorId(this.ocupacoes[index].classes[0].idclasse).subscribe(
        it => {
          it.ocupacao = this.ocupacoes[index];
          it.nome = value;
          this.classService.atualizar(it).subscribe(
            result => {}
          )
        }
      )
    }
  }

  removerOccupation(index: number): void{
    if(index != 0){
      let dialogRef = this.dialog.open(RemovalScreenDialogComponent);
      dialogRef.componentInstance.deleteClick.subscribe(
        result =>{
          this.ocupacaoService.remover((this.ocupacoes[index].idocupacao).toString()).subscribe(
            it => this.ocupacoes.splice(index, 1)
          )
        })
    }
  }
}
