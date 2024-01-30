import {Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {Janela} from "../../shared/model/janela";
import {Atividade} from "../../shared/model/atividade";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {JanelaService} from "../../shared/service/janela.service";
import {TemplateService} from "../../shared/service/template.service";
import {Subarea} from "../../shared/model/subarea";
import {AtividadeService} from "../../shared/service/atividade.service";
import {JanelaFactory} from "../../shared/factoryDirectory/janelaFactory";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {IndisponivelComponent} from "../indisponivel/indisponivel.component";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {TemplatesComponent} from "../templates/templates.component";
import {SubareaTemplateComponent} from "../subarea-template/subarea-template.component";
import {DialogComponent} from "../../dialogs/dialog/dialog.component";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit  {
  windows!: Array<Janela>;
  janela!: Janela;
  subarea!: Subarea;
  index!: number;
  windows_limit: number = 3;
  @Input() activity!: Atividade;
  

  constructor(private dialog: MatDialog, private janelaService: JanelaService,
              private templateService: TemplateService, private atividadeService: AtividadeService) {}

  ngOnInit(): void {
    this.index = 0;    
  }

  ngOnChanges() {
    if(this.activity != undefined){
      if(this.activity.janelas.length != 0){
        this.index = 0;
        this.atividadeService.pesquisarPorId(this.activity.idatividade).subscribe(
          it => {
            this.windows =  OrdemDependency.ordenar(it.janelas);
            this.janela = this.windows[0];
          }
        )
      }
    }
  }

  removerJanela(index: number): void{
    if(index != 0){
      let dialogRef = this.dialog.open(RemovalScreenDialogComponent);
      dialogRef.componentInstance.deleteClick.subscribe(
        it =>{
          if (this.index == index){
            this.janela = this.windows[index - 1];
            this.index = index - 1;
          }
          this.janelaService.remover((this.windows[index].idjanela).toString()).subscribe(
            result => this.windows.splice(index, 1)
          )
        }
      );
    }
  }

  editarJanela(index: number): void{
    let dialogRef = this.dialog.open(EditDialogComponent, {
      data:{
          type: ("janela"),
          datakey: ((this.windows[index].idjanela).toString()),
          key: this.activity
      }
    });

    dialogRef.componentInstance.submitClicked.subscribe(
      result => {
        this.windows.splice(index, 1, result)
      }
    );
  }

  addJanela(): void{
    if(this.windows.length < this.windows_limit){
      let window!: Janela;
      const ordem = this.windows[this.windows.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        result => {
          window = JanelaFactory.criarJanela(result, ordem);
          window.nome = '. . .';
          window.atividade = this.activity;
          this.janelaService.inserir(window).subscribe(
            it => {
              this.windows.push(it)
            }
          )
        }
      )
    }
  }

  enviarJanela(index: number): void{
    this.janela = this.windows[index];
    this.index = index;
  }

  throwSubarea(subarea: Subarea): void{
    this.subarea = subarea;
  }

  openChangeSubarea(): void{
    this.dialog.open(SubareaTemplateComponent, {
      panelClass: 'dialogPadding',
      data: this.janela
    })
  }

  openTemplates(): void{
    let dialogRef = this.dialog.open(TemplatesComponent, {
      panelClass: ['dialogPadding','dialogTemplate'],
      data: this.activity
    });

    dialogRef.componentInstance.changeEmitter.subscribe(
      result => {
        for (let i = 0; i < this.windows.length; i++){
          if (this.windows[i].idjanela == result.idjanela){
            this.windows.splice(i, 1, result)
            if(result.idjanela == this.janela.idjanela){
              this.janela = this.windows[i];
            }
          }
        }
      }
    );
  }

  openInfo(): void{
    this.dialog.open(DialogComponent, {
      data: this.janela,
      panelClass: 'dialogPadding'
    });
  }

  openVisualStudio(): void{
    //var child_process = require('child_process');
    //child_process.exec("start cmd.exe /K cd..");
    this.dialog.open(IndisponivelComponent)
  }
}
