import {Component, EventEmitter, Input, Output, OnInit, SimpleChanges} from '@angular/core';
import {Atividade} from "../../shared/model/atividade";
import {AtividadeService} from "../../shared/service/atividade.service";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Janela} from "../../shared/model/janela";
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";
import {JanelaService} from "../../shared/service/janela.service";

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {
  atividades!:  Array<Atividade>;
  //Index usado para saber em qual parte da lista vc se encontrar,
  // para então poder alterar a apresentação das janelas, no metodo remover;
  index!: number;
  @Input() usuario!: Usuario;
  @Output() newEmitter = new EventEmitter<Atividade>();

  constructor(private usuarioService: UsuarioService, private janelaService: JanelaService,
              private atividadeService: AtividadeService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.atividades = this.usuario.atividades;
    this.newEmitter.emit(this.atividades[0]);
    this.index = 0;
  }

  addAtividade(): void{
    const atv = new Atividade("New");
    atv.usuario = this.usuario;

    const janela = new Janela();
    janela.nome = "Test";
    atv.janelas.push(janela);

    this.atividadeService.inserir(atv).subscribe(
      it => {
        this.atividades.push(it)
      }
    )
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
      if (this.index == index){
        this.newEmitter.emit(this.atividades[index - 1]);
      }
      this.atividadeService.remover((this.atividades[index].idatividade).toString()).subscribe(
        result => this.atividades.splice(index, 1)
      )
    }
  }

  mandarJanelas(index: number): void{
    this.newEmitter.emit(this.atividades[index]);
    this.index = index;
  }
}
