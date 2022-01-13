import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  copyArrayItem, CdkDragExit
} from "@angular/cdk/drag-drop";
import {TemplateService} from "../../shared/service/template.service";
import {JanelaService} from "../../shared/service/janela.service";
import {AtividadeService} from "../../shared/service/atividade.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Atividade} from "../../shared/model/atividade";
import {JanelaFactory} from "../../shared/factoryDirectory/janelaFactory";
import {Janela} from "../../shared/model/janela";
import {Router} from "@angular/router";
import {OrdemDependency} from "../../shared/solid/ordemDependency";

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  templates!: Array<any>;
  janelas!: Array<any>;
  janelas_templates: Array<any> = [];
  @Output() newEmitter = new EventEmitter<Janela>();

  transferringItem: any = undefined;

  constructor(private templateService: TemplateService, @Inject(MAT_DIALOG_DATA) public data: Atividade,
              private atividadeService: AtividadeService, private  janelaService: JanelaService) {
    this.atividadeService.pesquisarPorId(this.data.idatividade).subscribe(
      it => {
        this.janelas = OrdemDependency.ordenar(it.janelas);

        for( let i = 0; i< it.janelas.length; i++){
          this.janelas_templates.push([])
        }
      }
    )

    this.templateService.listar().subscribe(
      it => this.templates = it
    )
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>, index: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      //const idtemplate = this.templates[event.previousIndex].idtemplate;
      let idTemplate : number;

      if(event.previousContainer.data.length == 1){
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

        idTemplate = this.janelas_templates[index][0].idtemplate;
      }
      else{
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

        idTemplate = this.janelas_templates[index][0].idtemplate;

      }

      this.templateService.pesquisarPorId(idTemplate).subscribe(
        result => {
          let window!: Janela;
          window = JanelaFactory.criarJanela(result, this.janelas[index].ordem);
          window.atividade = this.data;
          window.idjanela = this.janelas[index].idjanela;
          this.janelaService.atualizar(window).subscribe(
            it => {
              this.janelas[index] = it;
              this.newEmitter.emit(it);
            }
          )
        }
      )

      this.transferringItem = undefined;
    }

  }

  entered() {
    this.transferringItem = undefined;
  }

  exited(e: CdkDragExit) {
    this.transferringItem = e.item.data;
  }

  evenPredicate (drag: CdkDrag, drop: CdkDropList){
    return drop.data.length == 0;
  }

  removeBox(index: number): void{
    this.janelas_templates[index].splice(0, 1);
  }
}
