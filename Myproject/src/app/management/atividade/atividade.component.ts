import { Component, OnInit } from '@angular/core';
import {Atividade} from "../../shared/model/atividade";
import {AtividadeService} from "../../shared/service/atividade.service";

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {
  atividades!:  Array<Atividade>;

  constructor(private atividadeService: AtividadeService) {

  }

  ngOnInit(): void {
    this.atividadeService.listar().subscribe(
      it => this.atividades = it
    )
  }

  addAtividade(): void{
    const atv = new Atividade();
    atv.nome = "Atividade!";

    this.atividadeService.inserir(atv).subscribe(
      it => console.log(it)
    )
  }

  atualizarNome(): void{

  }

  removerAtividade(index: number): void{
    /*this.atividadeService.remover(index.toString()).subscribe(
      it => console.log(it)
    )*/
    console.log(index);
  }
}
