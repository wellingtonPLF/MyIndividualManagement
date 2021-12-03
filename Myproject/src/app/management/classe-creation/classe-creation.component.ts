import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {Classe} from "../../shared/model/classe";
import {ActivatedRoute, Router} from "@angular/router";
import {ClasseService} from "../../shared/service/classe.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {IndisponivelComponent} from "../indisponivel/indisponivel.component";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";

@Component({
  selector: 'app-classe-creation',
  templateUrl: './classe-creation.component.html',
  styleUrls: ['./classe-creation.component.scss']
})
export class ClasseCreationComponent implements OnInit {
  classe!: Classe;
  timeout: any = null;
  @Output() updateClick = new EventEmitter<any>();
  @Output() removedClick = new EventEmitter<any>();

  constructor(private rotalAtual: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog, private classeService: ClasseService) { }

  ngOnInit(): void {
    this.classeService.pesquisarPorId(this.data.datakey).subscribe(
      it => {
        this.classe = it;
      }
    );
  }

  saveEdit(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.executeListing(event.target.value);
      }
    }, 1000);
  }

  private executeListing(value: string) {
    if(value != ''){
      const classe = this.classe;
      classe.nome = value;
      this.classeService.pesquisarOcupacaoPorIdClasse(classe.idclasse).subscribe(
        it => {
          classe.ocupacao = it;
          this.classeService.atualizar(classe).subscribe(
            result => this.updateClick.emit(result)
          )
        }
      )
    }
  }

  removeClasse(): void{
    if(this.classe.ordem != 0){
      let dialogRef = this.dialog.open(RemovalScreenDialogComponent);
      dialogRef.componentInstance.deleteClick.subscribe(
        result =>{
          this.classeService.remover((this.classe.idclasse).toString()).subscribe(
            it => {
              this.removedClick.emit()
            }
          )
        })
    }
  }

  showInfo(): void{
    this.dialog.open(IndisponivelComponent);
  }
}
