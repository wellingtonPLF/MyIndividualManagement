import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Classe} from "../../shared/model/classe";
import {ClasseService} from "../../shared/service/classe.service";

@Component({
  selector: 'app-classe-info',
  templateUrl: './classe-info.component.html',
  styleUrls: ['./classe-info.component.scss']
})
export class ClasseInfoComponent implements OnInit {
  timeout: any = null;
  classe!: Classe;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private classeService: ClasseService) { }

  ngOnInit(): void {
    this.classeService.pesquisarPorId(this.data.datakey).subscribe(
      it => {
        this.classe = it
      }
    )
  }

  saveEdit(event: any, tipo: string) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.executeListing(event.target.value, tipo);
      }
    }, 500);
  }

  private executeListing(value: string, tipo: string) {
    this.classeService.pesquisarOcupacaoPorIdClasse(this.data.datakey).subscribe(
      it => {
        this.classe.ocupacao = it;
        if(tipo == 'como'){
          this.classe.como = value;
        }
        if(tipo == 'oque'){
          this.classe.oque = value;
        }
        if(tipo == 'porque'){
          this.classe.porque = value;
        }
        if(tipo == 'quando'){
          this.classe.quando = value;
        }
        if(tipo == 'info'){
          this.classe.info = value;
        }
        this.classeService.atualizar(this.classe).subscribe(
          result => {}
        )
      }
    )
  }
}
