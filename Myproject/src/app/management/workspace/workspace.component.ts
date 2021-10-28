import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Janela} from "../../shared/model/janela";
import {Atividade} from "../../shared/model/atividade";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {JanelaService} from "../../shared/service/janela.service";
import {TemplateService} from "../../shared/service/template.service";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  windows!: Array<Janela>;
  @Input() activity!: Atividade;

  constructor(public dialog: MatDialog, private janelaService: JanelaService,
              private templateService: TemplateService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.activity != undefined){
      if(this.activity.janelas.length != 0){
        this.windows = this.activity.janelas;
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
          datakey: ((this.activity.janelas[index].idjanela).toString()),
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
    let window = new Janela();
    this.templateService.pesquisarPorId(1).subscribe(
      it => {
        window.nome = '. . .';
        window.atividade = this.activity;
        window.template = it;
        window.subareas = it.janela_c.subareas;
        this.janelaService.inserir(window).subscribe(
          result => {
            this.windows.push(result)
          }
        )
      }
    )
  }
}
