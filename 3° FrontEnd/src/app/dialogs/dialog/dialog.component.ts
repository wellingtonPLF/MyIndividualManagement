import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Classe} from "../../shared/model/classe";
import {ClasseService} from "../../shared/service/classe.service";
import {Janela} from "../../shared/model/janela";
import {I_info} from "../../shared/interfaces/I_info";
import {JanelaService} from "../../shared/service/janela.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  timeout: any = null;
  objeto!: I_info;
  classe!: Classe;
  janela!: Janela;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private janelaService: JanelaService,
              private classeService: ClasseService) { }

  ngOnInit(): void {
    if(this.data.objectType == 'Classe'){
      this.classeService.pesquisarPorId(this.data.idclasse).subscribe(
        it => {
          this.classe = it
          this.objeto = it
        }
      )
    }
    else if (this.data.objectType == 'Janela'){
      this.janelaService.pesquisarPorId(this.data.idjanela).subscribe(
        it => {
          this.janela = it
          this.objeto = it
        }
      )
    }
  }

  saveEdit(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.executeListing(event.target.value);
      }
    }, 500);
  }

  private executeListing(value: string) {
    if(this.data.objectType == 'Classe') {
      this.classeService.pesquisarOcupacaoPorIdClasse(this.data.idclasse).subscribe(
        it => {
          this.classe.info = value;
          this.classe.ocupacao = it;
          this.classeService.atualizar(this.classe).subscribe(
            result => {}
          )
        }
      )
    }
    else if (this.data.objectType == 'Janela'){
      this.janelaService.pesquisarAtividadeByIdJanela(this.data.idjanela).subscribe(
        it => {
          this.janelaService.pesquisarTemplateByIdJanela(this.data.idjanela).subscribe(
            templat => {
              this.janela.info = value;
              this.janela.template = templat
              this.janela.atividade = it;
              this.janelaService.atualizar(this.janela).subscribe(
                result => {}
              )
            }
          )
        }
      )
    }
  }
}
