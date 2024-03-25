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
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Atividade} from "../../shared/model/atividade";
import {JanelaFactory} from "../../shared/factoryDirectory/janelaFactory";
import {Janela} from "../../shared/model/janela";
import {Router} from "@angular/router";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  templates!: Array<any>;
  janelas!: Array<any>;
  janelas_templates!: Array<any>;
  @Output() changeEmitter = new EventEmitter<Janela>();
  //----------------- Paginação -------------------------//
  eventlength = 3;
  pageIndex: number = 1;
  //-----------------------------------------------------//

  transferringItem: any = undefined;

  constructor(private templateService: TemplateService, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: Atividade,
              private atividadeService: AtividadeService, private  janelaService: JanelaService) {
    this.atividadeService.pesquisarPorId(this.data.idatividade).subscribe(
      it => {
        this.janelas = OrdemDependency.ordenar(it.janelas);

        this.gettingFields();
      }
    )

    this.templateService.listar().subscribe(
      it => this.templates = it
    )
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>, index: number) {
    let idTemplate : number;
    /*let dialogRef = this.dialog.open(RemovalScreenDialogComponent);

    dialogRef.componentInstance.deleteClick.subscribe(
      result =>{

      })*/

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
        window = JanelaFactory.criarJanela(result, this.janelas[this.indexItens(index)].ordem);
        window.atividade = this.data;
        window.idjanela = this.janelas[this.indexItens(index)].idjanela;
        window.nome = this.janelas[this.indexItens(index)].nome
        this.janelaService.atualizar(window).subscribe(
          it => {
            this.janelas[this.indexItens(index)] = it;
            this.changeEmitter.emit(it);
          }
        )
      }
    )

    this.transferringItem = undefined;
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

  gettingFields(): void{
    const fields = new Array<any>();
    for( let i = 0; i< this.eventlength; i++){
      fields.push([])
    }
    this.janelas_templates = fields;
  }

  //-----------------------------------------//
  onPageChange(event: PageEvent): void{
    this.pageIndex = event.pageIndex + 1;
    this.gettingFields();
  }

  calcItensByPage(i: number): boolean{
    return this.indexItens(i) > (2 + (3 * (this.pageIndex - 1)));
  }

  indexItens(index: number): number{
    return (index + (3 * (this.pageIndex - 1)));
  }

  calcPages(): number{
    if(this.janelas != undefined){
      return Math.ceil(this.janelas.length/this.eventlength)
    }
    return - 1;
  }
  //-----------------------------------------//
}
