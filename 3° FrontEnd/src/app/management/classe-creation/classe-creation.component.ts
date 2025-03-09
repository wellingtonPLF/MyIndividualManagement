import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {Classe} from "../../shared/model/classe";
import {ActivatedRoute, Router} from "@angular/router";
import {ClasseService} from "../../shared/service/classe.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {IndisponivelComponent} from "../indisponivel/indisponivel.component";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {ClasseInfoComponent} from "../classe-info/classe-info.component";

@Component({
  selector: 'app-classe-creation',
  templateUrl: './classe-creation.component.html',
  styleUrls: ['./classe-creation.component.scss']
})
export class ClasseCreationComponent implements OnInit {
  classe!: Classe;
  timeout: any = null;
  disable: number = 0
  @Output() updateClick = new EventEmitter<any>();
  @Output() removedClick = new EventEmitter<any>();

  qntItens: number = 2;

  constructor(private rotalAtual: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog, private classeService: ClasseService) { }

  ngOnInit(): void {
    this.classeService.pesquisarPorId(this.data.datakey).subscribe(
      {
        next: it => {
          this.classe = it;
          this.calcQntItens()
        },
        error: _ => {}
      }
    );

    window.addEventListener('resize', () => {
      this.calcQntItens()
    });
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

  calcQntItens(): void {
    const windowWidth = window.innerWidth
    const leftSide = 0
    const paddingWorkSpace = 20
    const borderRight = 3
    const result = leftSide + borderRight + (paddingWorkSpace * 2)

    let ocupationWidth = windowWidth - result

    let calc = Math.floor((ocupationWidth - 80) / 135)
    if (ocupationWidth > 350) {
      this.qntItens = calc
    }
    else {
      this.qntItens = 2
    }
  }

  private executeListing(value: string) {
    if(value != ''){
      this.classeService.pesquisarPorId(this.classe.idclasse).subscribe(
        response => {
          this.classeService.pesquisarOcupacaoPorIdClasse(response.idclasse).subscribe(
            it => {
              response.nome = value;
              response.ocupacao = it;
              this.classeService.atualizar(response).subscribe(
                result => this.updateClick.emit(result)
              )
            }
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
    this.dialog.open(ClasseInfoComponent, {
      height: '520px',
      data: {
        datakey: this.classe.idclasse
      },
      panelClass: ['dialogPadding','backgroundColorWhite'],
    });
  }

  inputDisable(elemento :HTMLElement): void{
    if(this.disable == 0){
      elemento.blur()
      this.disable = 1;
    }
  }

  inputEnable(elemento :HTMLElement): void{
    elemento.focus()
  }
}
