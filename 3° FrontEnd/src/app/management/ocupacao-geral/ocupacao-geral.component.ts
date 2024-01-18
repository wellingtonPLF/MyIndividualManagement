import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Subarea} from "../../shared/model/subarea";
import {Ocupacao} from "../../shared/model/ocupacao";
import {OcupacaoService} from "../../shared/service/ocupacao.service";
import {TemplateService} from "../../shared/service/template.service";
import {SubareaService} from "../../shared/service/subarea.service";
import {OcupacaoFactory} from "../../shared/factoryDirectory/ocupacaoFactory";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import { FuncShareService } from 'src/app/shared/utils/func-share.service';
import { ScreenWidthSize } from 'src/app/shared/enum/screenWidthSize';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ocupacao-geral',
  templateUrl: './ocupacao-geral.component.html',
  styleUrls: ['./ocupacao-geral.component.scss']
})
export class OcupacaoGeralComponent implements OnInit {
  show: number | undefined = 0;
  @Input() subarea!: Subarea;
  ocupacoes!: Array<Ocupacao>;
  timeout: any = null;

  qntItens: number = 2;
  logicExecuted = false;
  leftSide = false;

  variable$!: Observable<any>;

  @ViewChild('myDiv', { static: false }) myDiv!: ElementRef;

  constructor(private ocupacaoService: OcupacaoService, private dialog: MatDialog, private fshare: FuncShareService,
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
    
    if (window.innerWidth < 582) {
      this.leftSide = true
    }
    window.addEventListener('resize', () => {
      this.calcQntItens(this.leftSide)
    });
  }

  ngDoCheck() {
    if (!this.logicExecuted) {
      if (this.myDiv) {
        this.calcQntItens(this.leftSide)
        this.logicExecuted = true;
      }
    }
  }

  ngOnChanges(): void{
    if(this.subarea != undefined){
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
        $this.executeListing(event.target.value, i);
      }
    }, 2000);
  }

  private executeListing(value: string, index: number) {
    if(value != ''){
      this.ocupacaoService.pesquisarPorId(this.ocupacoes[index].idocupacao).subscribe(
        response => {
          response.nome = value;
          this.ocupacaoService.pesquisarSubareaPorIdOcupacao(response.idocupacao).subscribe(
            it => {
              response.subarea = it;
              this.ocupacaoService.atualizar(response).subscribe(
                result => {}
              )
            }
          )
        }
      )
    }
  }

  removerOcupacao(index: number): void{
    if(index != 0){
      let dialogRef = this.dialog.open(RemovalScreenDialogComponent);
      dialogRef.componentInstance.deleteClick.subscribe(
        result =>{
          this.ocupacaoService.remover((this.ocupacoes[index].idocupacao).toString()).subscribe(
            it => this.ocupacoes.splice(index, 1)
          )
        })
    }
  }

  addOcupacao(): void{
    if(this.ocupacoes.length < 7){
      let ocupacao!: Ocupacao;
      const ordem = this.ocupacoes[this.ocupacoes.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        result => {
          ocupacao = OcupacaoFactory.criarOcupacao(result.janela_c.subareas[0], ordem);
          //ocupacao.nome = "Digite Aqui!";
          ocupacao.nome = "New";
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
}
