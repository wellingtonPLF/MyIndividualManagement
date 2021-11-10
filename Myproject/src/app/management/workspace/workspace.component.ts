import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Janela} from "../../shared/model/janela";
import {Atividade} from "../../shared/model/atividade";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {JanelaService} from "../../shared/service/janela.service";
import {TemplateService} from "../../shared/service/template.service";
import {Subarea} from "../../shared/model/subarea";
import {SubareaService} from "../../shared/service/subarea.service";
import {Ocupacao} from "../../shared/model/ocupacao";
import {Classe} from "../../shared/model/classe";
import {AtividadeService} from "../../shared/service/atividade.service";
import {JanelaFactory} from "../../shared/factoryDirectory/janelaFactory";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  windows!: Array<Janela>;
  janela!: Janela;
  subarea!: Subarea;
  index!: number;
  @Input() activity!: Atividade;

  constructor(public dialog: MatDialog, private janelaService: JanelaService,
              private templateService: TemplateService, private atividadeService: AtividadeService) { }

  ngOnInit(): void {
    this.index = 0;
  }

  ngOnChanges() {
    const listaOrdem = Array<number>();
    if(this.activity != undefined){
      if(this.activity.janelas.length != 0){
        this.index = 0;
        const janelasEmOrdem = new Array<Janela>();
        this.atividadeService.pesquisarPorId(this.activity.idatividade).subscribe(
          it => {
            for(let janela of it.janelas){
              listaOrdem.push(janela.ordem);
            }
            listaOrdem.sort();
            for(let i = 0; i < listaOrdem.length; i++){
              for(let j = 0; j < listaOrdem.length; j++){
                if(listaOrdem[i] == it.janelas[j].ordem){
                  janelasEmOrdem.push(it.janelas[j])
                  break
                }
              }
            }
            this.windows = janelasEmOrdem;
            this.janela = this.windows[0];
          }
        )
      }
    }
  }

  removerJanela(index: number): void{
    if(index != 0){
      this.janelaService.remover((this.windows[index].idjanela).toString()).subscribe(
        result => this.windows.splice(index, 1)
      )
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
    let window!: Janela;
    const ordem = this.windows[this.windows.length - 1].ordem + 1;

    this.templateService.pesquisarPorId(1).subscribe(
      result => {
        window = JanelaFactory.criarJanela(result, ordem);
        window.nome = '. . .';
        window.atividade = this.activity;
        this.janelaService.inserir(window).subscribe(
          result => {
            this.windows.push(result)
          }
        )
      }
    )
  }

  enviarJanela(index: number): void{
    this.janela = this.windows[index];
    this.index = index;
  }

  throwSubarea(subarea: Subarea): void{
    this.subarea = subarea;
  }
}
