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
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";

@Component({
  selector: 'app-those-subareas',
  templateUrl: './those-subareas.component.html',
  styleUrls: ['./those-subareas.component.scss']
})
export class ThoseSubareasComponent implements OnInit {
  templateName!: String;
  subareas!: Array<Subarea>;
  selectedSubarea!: Subarea;
  index!: number;
  subareas_limit: number = 3;
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
          this.selectedSubarea = this.subareas[0];
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
    if(this.subareas.length < this.subareas_limit){
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

  enviarSubarea(index?: number): void {
    const value = (index == undefined) ? this.subareas.indexOf(this.selectedSubarea) : index;
    this.subareaEmitter.emit(this.subareas[value]);
    this.index = value;
  }

  editarSubarea(index?: number): void{
    const value = (index == undefined) ? this.subareas.indexOf(this.selectedSubarea) : index;
    let dialogRef = this.dialog.open(EditDialogComponent, {
      data:{
        type: ("subarea"),
        datakey: (this.subareas[value].idsubarea).toString(),
        key: this.janela
      }
    });

    dialogRef.componentInstance.submitClicked.subscribe(
      result => {
        this.subareas.splice(value, 1, result)
      }
    );
  }

  deleteSubarea(index?: number): void{
    const value = (index == undefined) ? this.subareas.indexOf(this.selectedSubarea) : index;
    if(value != 0) {
      let dialogRef = this.dialog.open(RemovalScreenDialogComponent);
      dialogRef.componentInstance.deleteClick.subscribe(
        _ => {
          if (this.index == value){
            this.subareaEmitter.emit(this.subareas[value - 1]);
            this.index = value - 1;
          }

          this.subareaService.remover((this.subareas[value].idsubarea).toString()).subscribe(
            _ => {
              this.subareas.splice(value, 1)
              this.selectedSubarea = this.subareas[0]
            }
          )
        }
      )
    }
  }
}
