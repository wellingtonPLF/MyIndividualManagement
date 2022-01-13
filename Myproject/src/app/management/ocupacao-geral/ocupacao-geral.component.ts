import {Component, Input, OnInit} from '@angular/core';
import {Subarea} from "../../shared/model/subarea";
import {Ocupacao} from "../../shared/model/ocupacao";
import {OcupacaoService} from "../../shared/service/ocupacao.service";
import {TemplateService} from "../../shared/service/template.service";
import {SubareaService} from "../../shared/service/subarea.service";
import {OcupacaoFactory} from "../../shared/factoryDirectory/ocupacaoFactory";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-ocupacao-geral',
  templateUrl: './ocupacao-geral.component.html',
  styleUrls: ['./ocupacao-geral.component.scss']
})
export class OcupacaoGeralComponent implements OnInit {
  show: number | undefined = 0;
  @Input() subarea!: Subarea;
  ocupacoes!: Array<Ocupacao>;
  timeout: any = null;

  constructor(private ocupacaoService: OcupacaoService, private dialog: MatDialog,
              private templateService: TemplateService, private subareaService: SubareaService) { }

  ngOnInit(): void {
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
        $this.executeListing(event.target.value, i);
      }
    }, 2000);
  }

  private executeListing(value: string, index: number) {
    if(value != ''){
      const ocupacao = this.ocupacoes[index];
      ocupacao.nome = value;
      this.ocupacaoService.pesquisarSubareaPorIdOcupacao(ocupacao.idocupacao).subscribe(
        it => {
          ocupacao.subarea = it;
          this.ocupacaoService.atualizar(ocupacao).subscribe(
            result => {}
          )
        }
      )
    }
  }

  removerOcupacao(index: number): void{
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

  addOcupacao(): void{
    if(this.ocupacoes.length < 7){
      let ocupacao!: Ocupacao;
      const ordem = this.ocupacoes[this.ocupacoes.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        result => {
          ocupacao = OcupacaoFactory.criarOcupacao(result.janela_c.subareas[0], ordem);
          //ocupacao.nome = "Digite Aqui!";
          ocupacao.nome = "New";
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
}
