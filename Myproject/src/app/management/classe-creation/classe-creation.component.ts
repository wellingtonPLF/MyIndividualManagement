import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {Classe} from "../../shared/model/classe";
import {ActivatedRoute, Router} from "@angular/router";
import {ClasseService} from "../../shared/service/classe.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-classe-creation',
  templateUrl: './classe-creation.component.html',
  styleUrls: ['./classe-creation.component.scss']
})
export class ClasseCreationComponent implements OnInit {
  classe!: Classe;
  timeout: any = null;

  constructor(private _location: Location, private rotalAtual: ActivatedRoute,
              private dialog: MatDialog, private classeService: ClasseService) { }

  ngOnInit(): void {
    if (this.rotalAtual.snapshot.paramMap.has('id')) {
      const id = Number(this.rotalAtual.snapshot.paramMap.get('id'));
      this.classeService.pesquisarPorId(id).subscribe(
        it => {
          this.classe = it;
        }
      );
    }
  }

  backClicked(): void{
    this._location.back();
  }

  saveEdit(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.executeListing(event.target.value);
      }
    }, 2000);
  }

  private executeListing(value: string) {
    if(value != ''){
      const classe = this.classe;
      classe.nome = value;
      this.classeService.pesquisarOcupacaoPorIdClasse(classe.idclasse).subscribe(
        it => {
          classe.ocupacao = it;
          this.classeService.atualizar(classe).subscribe(
            result => {}
          )
        }
      )
    }
  }

  removeClasse(): void{
    if(this.classe.ordem != 0){
      this.classeService.remover((this.classe.idclasse).toString()).subscribe(
        it => this.backClicked()
      )
    }
  }
}
