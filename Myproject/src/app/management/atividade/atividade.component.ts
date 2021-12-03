import {Component, EventEmitter, Input, Output, OnInit, SimpleChanges} from '@angular/core';
import {Atividade} from "../../shared/model/atividade";
import {AtividadeService} from "../../shared/service/atividade.service";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";
import {TemplateService} from "../../shared/service/template.service";
import {JanelaService} from "../../shared/service/janela.service";
import {AtividadeFactory} from "../../shared/factoryDirectory/atividadeFactory";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {
  atividades!:  Array<Atividade>;
  //Index usado para saber em qual parte da ista vc se encontra;
  index!: number;
  @Input() usuario!: Usuario;
  @Output() newEmitter = new EventEmitter<Atividade>();

  constructor(private usuarioService: UsuarioService, private templateService: TemplateService,
              private atividadeService: AtividadeService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.atividades = OrdemDependency.ordenar(this.usuario.atividades)
    this.newEmitter.emit(this.atividades[0]);
    this.index = 0;
  }

  addAtividade(): void{
    if(this.atividades.length < 10){
      let atv!: Atividade;
      const ordem = this.atividades[this.atividades.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        result => {
          atv = AtividadeFactory.criarAtividade(result, ordem);
          atv.nome = "New";
          atv.usuario = this.usuario;
          this.atividadeService.inserir(atv).subscribe(
            it => {
              this.atividades.push(it)
            }
          )
        }
      )
    }
  }

  atualizarNome(index: number): void{
    let dialogRef = this.dialog.open(EditDialogComponent, {
        data:{
            type: ("atividade"),
            datakey: (this.atividades[index].idatividade).toString(),
            key: this.usuario
        }
    });

    dialogRef.componentInstance.submitClicked.subscribe(
      result => {
          this.atividades.splice(index, 1, result)
      }
    );
  }

  removerAtividade(index: number): void{
    if(index != 0){
      let dialogRef = this.dialog.open(RemovalScreenDialogComponent);

      dialogRef.componentInstance.deleteClick.subscribe(
        it => {
          if (this.index == index){
            this.newEmitter.emit(this.atividades[index - 1]);
            this.index = index - 1;
          }
          this.atividadeService.remover((this.atividades[index].idatividade).toString()).subscribe(
            result => this.atividades.splice(index, 1)
          )
        }
      );
    }
  }

  mandarJanelas(index: number): void{
    this.newEmitter.emit(this.atividades[index]);
    this.index = index;
  }
}
