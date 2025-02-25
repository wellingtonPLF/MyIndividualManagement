import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AtividadeService} from "../../shared/service/atividade.service";
import {Atividade} from "../../shared/model/atividade";
import {JanelaService} from "../../shared/service/janela.service";
import {Janela} from "../../shared/model/janela";
import {I_nome} from "../../shared/interfaces/I_nome";
import {forkJoin} from "rxjs";
import {SubareaService} from "../../shared/service/subarea.service";
import {Subarea} from "../../shared/model/subarea";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  object!: I_nome;
  atividade!: Atividade;
  subarea!: Subarea;
  janela!: Janela;
  @Output() submitClicked = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private janelaService: JanelaService,
              private atividadeService: AtividadeService, private subareaService: SubareaService) {
  }

  ngOnInit(): void {
    const datakey = this.data.datakey;
    if(this.data.type == "atividade") {
      // Using serachById to solve TypeError: Converting circular structure to JSON
      this.atividadeService.pesquisarPorId(datakey).subscribe(
        {
          next: it => {
            this.atividade = it;
            this.object = it;
          },
          error: _ => {
            this.atividade = {...this.data.key.atividades[datakey]};
            this.object = {...this.atividade};
          }
        }
      )
    }
    if(this.data.type == "janela"){
      this.janelaService.pesquisarPorId(datakey).subscribe(
        {
          next: it => {
            this.janela = it;
            if(this.janela.nome == ". . ."){
              this.janela.nome = "";
            }
            this.object = {...this.janela};
          },
          error: _ => {
            this.janela = {...this.data.key.janelas[datakey]};
            if(this.janela.nome == ". . ."){
              this.janela.nome = "";
            }
            this.object = {...this.janela};
          }
        }        
      )
    }
    if(this.data.type == "subarea"){
      this.subareaService.pesquisarPorId(datakey).subscribe(
        {
          next: it => {
            this.subarea = it;
            if(this.subarea.nome == ". . ."){
              this.subarea.nome = "";
            }
            this.object = {...this.subarea};
          },
          error: _ => {
            this.subarea = {...this.data.key.subareas[datakey]};
            if(this.subarea.nome == ". . ."){
              this.subarea.nome = "";
            }
            this.object = {...this.subarea};
          }
      })
    }
  }

  confirmButton(): void{
    if(this.data.type == "atividade"){
      // Referenced to solve TypeError: object references an unsaved transient instance - save
      this.atividade.usuario = this.data.key;
      const lista_template_by_janela = [];
      for (const janela of this.atividade.janelas){
        const getTemplateObservable = this.janelaService.pesquisarTemplateByIdJanela(janela.idjanela);
        lista_template_by_janela.push(getTemplateObservable);
      }
      forkJoin(lista_template_by_janela).subscribe(
        {
          next: response => {
            this.atividade.janelas.map(
              (janela, index) => {
                janela['template'] = response[index];
                return janela;
              }
            )
            this.atividadeService.atualizar(this.atividade).subscribe(
              it => this.submitClicked.emit(it)
            )
          },
          error: _ => {
            this.submitClicked.emit(this.object)
          }
        }
      )
    }
    if(this.data.type == "janela"){
      this.janela.atividade = this.data.key;
      this.janelaService.pesquisarTemplateByIdJanela(this.janela.idjanela).subscribe(
        {
          next: templat => {
            this.janela.template = templat
            this.janelaService.atualizar(this.janela).subscribe(
              it => this.submitClicked.emit(it)
            )
          },
          error: _ => {
            this.submitClicked.emit(this.object)
          }
        }
      )
    }
    if(this.data.type == "subarea"){
      this.subarea.janela = this.data.key;
      this.subareaService.atualizar(this.subarea).subscribe(
        {
          next: it => this.submitClicked.emit(it),
          error: _ => {
            this.submitClicked.emit(this.object)
          }
        }
      )
    }
  }
}
