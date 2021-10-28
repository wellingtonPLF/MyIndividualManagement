import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AtividadeService} from "../../shared/service/atividade.service";
import {Atividade} from "../../shared/model/atividade";
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";
import {JanelaService} from "../../shared/service/janela.service";
import {Janela} from "../../shared/model/janela";
import {I_nome} from "../../shared/interfaces/I_nome";
import {Template} from "../../shared/model/template";


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  object!: I_nome;
  atividade!: Atividade;
  janela!: Janela;
  @Output() submitClicked = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private janelaService: JanelaService,
              private atividadeService: AtividadeService, private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    if(this.data.type == "atividade") {
      // Using serachById to solve TypeError: Converting circular structure to JSON
      this.atividadeService.pesquisarPorId(this.data.datakey).subscribe(
        it => {
          this.atividade = it;
          this.object = it;
        }
      )
    }
    if(this.data.type == "janela"){
      this.janelaService.pesquisarPorId(this.data.datakey).subscribe(
        it => {
          this.janela = it;
          if(this.janela.nome == ". . ."){
            this.janela.nome = "";
          }
          this.object = it;
        }
      )
    }
  }

  confirmButton(): void{
    if(this.data.type == "atividade"){
      // Referenced to solve TypeError: object references an unsaved transient instance - save
      this.atividade.usuario = this.data.key;
      this.atividadeService.atualizar(this.atividade).subscribe(
        it => {
          this.usuarioService.pesquisarPorId(this.data.key.idusuario).subscribe(
            result => this.submitClicked.emit(result.atividades.pop())
          )
        }
      )
    }
    if(this.data.type == "janela"){
      this.janela.atividade = this.data.key;
      this.janelaService.atualizar(this.janela).subscribe(
        it => {
          this.atividadeService.pesquisarPorId(this.data.key.idatividade).subscribe(
            result => this.submitClicked.emit(result.janelas.pop())
          )
        }
      )
    }
  }
}
