import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subarea} from "../../shared/model/subarea";
import {Janela} from "../../shared/model/janela";
import {JanelaService} from "../../shared/service/janela.service";
import {TemplateService} from "../../shared/service/template.service";
import {Ocupacao} from "../../shared/model/ocupacao";
import {Classe} from "../../shared/model/classe";
import {SubareaService} from "../../shared/service/subarea.service";
import {SubareaFactory} from "../../shared/factoryDirectory/subareaFactory";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {OrdemDependency} from "../../shared/solid/ordemDependency";

@Component({
  selector: 'app-those-subareas',
  templateUrl: './those-subareas.component.html',
  styleUrls: ['./those-subareas.component.scss']
})
export class ThoseSubareasComponent implements OnInit {
  templateName!: String;
  subareas!: Array<Subarea>;
  index!: number;
  @Output() subareaEmitter = new EventEmitter<Subarea>();
  @Input() janela!: Janela;

  constructor(public janelaService: JanelaService,
              public templateService: TemplateService, public dialog: MatDialog,
              public subareaService: SubareaService) { }

  ngOnInit(): void {
    this.index = 0
  }

  ngOnChanges(): void{
    if(this.janela != undefined){
      this.index = 0;
      this.janelaService.pesquisarPorId(this.janela.idjanela).subscribe(
        it => {
          this.subareas =  OrdemDependency.ordenar(it.subareas);
          this.subareaEmitter.emit(this.subareas[0]);
        }
      )
      this.janelaService.pesquisarTemplateByIdJanela(this.janela.idjanela).subscribe(
        it => {
          if(it != null){
            this.templateName = it.nome;
          }
        }
      )
    }
  }

  addSubarea(): void{
    if(this.subareas.length < 6){
      let subarea!: Subarea;
      const ordem = this.subareas[this.subareas.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        result => {
          subarea = SubareaFactory.criarSubarea(result, ordem);
          subarea.nome = '. . .';
          subarea.janela = this.janela;

          this.subareaService.inserir(subarea).subscribe(
            it => {
              this.subareas.push(it)
            }
          )
        }
      )
    }
  }

  enviarSubarea(index: number): void{
    this.subareaEmitter.emit(this.subareas[index]);
    this.index = index;
  }

  editarSubarea(index: number): void{
    let dialogRef = this.dialog.open(EditDialogComponent, {
      data:{
        type: ("subarea"),
        datakey: (this.subareas[index].idsubarea).toString(),
        key: this.janela
      }
    });

    dialogRef.componentInstance.submitClicked.subscribe(
      result => {
        this.subareas.splice(index, 1, result)
      }
    );
  }

  deleteSubarea(index: number): void{
    if(index != 0){
      if (this.index == index){
        this.subareaEmitter.emit(this.subareas[index - 1]);
        this.index = index - 1;
      }
      this.subareaService.remover((this.subareas[index].idsubarea).toString()).subscribe(
        result => this.subareas.splice(index, 1)
      )
    }
  }
}
