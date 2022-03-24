import {Component, Input, OnInit} from '@angular/core';
import {Subarea} from "../../shared/model/subarea";
import {Ocupacao} from "../../shared/model/ocupacao";
import {OcupacaoService} from "../../shared/service/ocupacao.service";
import {MatDialog} from "@angular/material/dialog";
import {TemplateService} from "../../shared/service/template.service";
import {SubareaService} from "../../shared/service/subarea.service";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {OcupacaoFactory} from "../../shared/factoryDirectory/ocupacaoFactory";
import {ClasseService} from "../../shared/service/classe.service";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {DialogComponent} from "../../dialogs/dialog/dialog.component";

@Component({
  selector: 'app-ocupacao-nominal',
  templateUrl: './ocupacao-nominal.component.html',
  styleUrls: ['./ocupacao-nominal.component.scss']
})
export class OcupacaoNominalComponent implements OnInit {
  show: number | undefined = 0;
  @Input() subarea!: Subarea;
  ocupacoes!: Array<Ocupacao>;
  difficult!: string;
  timeout: any = null;

  constructor(private ocupacaoService: OcupacaoService,
              private dialog: MatDialog, private classService: ClasseService,
              private templateService: TemplateService, private subareaService: SubareaService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void{
    if(this.subarea != undefined){
      if (this.subarea.tipo == "projeto"){
        this.difficult = 'extreme';
      }
      else if (this.subarea.tipo == "casual"){
        this.difficult = 'easy';
      }
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
    }, 500);
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

  addOccupation(): void{
    if(this.ocupacoes.length < 7){
      let ocupacao!: Ocupacao;
      const ordem = this.ocupacoes[this.ocupacoes.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        result => {
          ocupacao = OcupacaoFactory.criarOcupacao(result.janela_c.subareas[0], ordem);
          ocupacao.nome = "Occupation";
          ocupacao.subarea = this.subarea;

          this.ocupacaoService.inserir(ocupacao).subscribe(
            it => {
              this.ocupacoes.push(it)
            }
          )
        }
      )
    }
  }

  getInfo(index: number): void{
    this.dialog.open(DialogComponent, {
      data: this.ocupacoes[index].classes[0],
      panelClass: 'dialogPadding'
    });
  }
}
