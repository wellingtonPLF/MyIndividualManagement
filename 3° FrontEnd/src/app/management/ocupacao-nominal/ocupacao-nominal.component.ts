import {Component, Input, OnInit} from '@angular/core';
import {Subarea} from "../../shared/model/subarea";
import {Ocupacao} from "../../shared/model/ocupacao";
import {OcupacaoService} from "../../shared/service/ocupacao.service";
import {MatDialog} from "@angular/material/dialog";
import {TemplateService} from "../../shared/service/template.service";
import {SubareaService} from "../../shared/service/subarea.service";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {OcupacaoFactory} from "../../shared/factoryDirectory/ocupacaoFactory";
import {ClasseService} from "../../shared/service/classe.service";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {DialogComponent} from "../../dialogs/dialog/dialog.component";
import { ScreenWidthSize } from 'src/app/shared/enum/screenWidthSize';
import { FuncShareService } from 'src/app/shared/utils/func-share.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ocupacao-nominal',
  templateUrl: './ocupacao-nominal.component.html',
  styleUrls: ['./ocupacao-nominal.component.scss']
})
export class OcupacaoNominalComponent implements OnInit {
  show: number | undefined = 0;
  @Input() subarea!: Subarea;
  ocupacoes!: Array<Ocupacao>;
  difficult!: string;
  timeout: any = null;

  qntItens: number = 2;
  leftSide = false;
  variable$!: Observable<any>;

  constructor(private ocupacaoService: OcupacaoService,
              private dialog: MatDialog, private classService: ClasseService, private fshare: FuncShareService,
              private templateService: TemplateService, private subareaService: SubareaService, private store: Store<any>) {
    this.variable$ = this.store.select('leftSideReducer');
    this.fshare.getClickEvent().subscribe(
      it => {
        this.leftSide = it
        if (window.innerWidth < 582) {
          this.leftSide = true
        }
        this.calcQntItens(this.leftSide)
      }
    )
  }

  ngOnInit(): void {
    this.variable$.subscribe(
      it => {
        this.leftSide = it
      }
    )

    this.calcQntItens(this.leftSide)

    if (window.innerWidth < 582) {
      this.leftSide = true
    }
    window.addEventListener('resize', () => {
      this.calcQntItens(this.leftSide)
    });
  }

  ngOnChanges(): void{
    if(this.subarea != undefined){
      if (this.subarea.tipo == "projeto"){
        this.difficult = 'extreme';
      }
      else if (this.subarea.tipo == "casual"){
        this.difficult = 'easy';
      }
      this.subareaService.pesquisarPorId(this.subarea.idsubarea).subscribe(
        it => {
          this.ocupacoes =  OrdemDependency.ordenar(it.ocupacoes);
        }
      )
    }
  }

  calcQntItens(value: boolean): void {
    const windowWidth = (window.innerWidth >= ScreenWidthSize.maxWidth) ? ScreenWidthSize.maxWidth : window.innerWidth
    const leftSide = (value)? 0 : ScreenWidthSize.leftSlideWitdh
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

  showClasse(index: number): void{
    if(this.show == index){
      this.show = undefined;
    }
    else{
      this.show = index;
    }
  }

  saveEdit(event: any, i: number) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.execListing(event.target.value, i);
      }
    }, 500);
  }

  private execListing(value: string, index: number) {
    if(value != ''){
      this.classService.pesquisarPorId(this.ocupacoes[index].classes[0].idclasse).subscribe(
        it => {
          it.ocupacao = this.ocupacoes[index];
          it.nome = value;
          this.classService.atualizar(it).subscribe(
            result => {}
          )
        }
      )
    }
  }

  removerOccupation(index: number): void{
    if(index != 0){
      let dialogRef = this.dialog.open(RemovalScreenDialogComponent);
      dialogRef.componentInstance.deleteClick.subscribe(
        result =>{
          this.ocupacaoService.remover(this.ocupacoes[index].idocupacao).subscribe(
            it => this.ocupacoes.splice(index, 1)
          )
        })
    }
  }

  addOccupation(): void{
    if(this.ocupacoes.length < 7){
      let ocupacao!: Ocupacao;
      const ordem = this.ocupacoes[this.ocupacoes.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        result => {
          ocupacao = OcupacaoFactory.criarOcupacao(result.janela_c.subareas[0], ordem);
          ocupacao.nome = "Occupation";
          ocupacao.subarea = this.subarea;

          this.ocupacaoService.inserir(ocupacao).subscribe(
            it => {
              this.ocupacoes.push(it)
            }
          )
        }
      )
    }
  }

  getInfo(index: number): void{
    this.dialog.open(DialogComponent, {
      data: this.ocupacoes[index].classes[0],
      panelClass: 'dialogPadding'
    });
  }
}
