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
import { RegistryStore } from 'src/app/shared/ngRx/registryStore';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-ocupacao-geral',
  templateUrl: './ocupacao-geral.component.html',
  styleUrls: ['./ocupacao-geral.component.scss']
})
export class OcupacaoGeralComponent implements OnInit {
  show: number | undefined = 0;
  subarea!: Subarea
  
  ocupacoes!: Array<Ocupacao>;
  ocupation$!:Observable<any>;
  ocupations_limit: number = 7;

  logicExecuted = false;
  leftSide = false;
  timeout: any = null;
  qntItens: number = 2;
  variable$!: Observable<any>;

  @ViewChild('myDiv', { static: false }) myDiv!: ElementRef;

  constructor(private ocupacaoService: OcupacaoService, private dialog: MatDialog, 
      private fshare: FuncShareService, private registry: RegistryStore,
      private templateService: TemplateService, private subareaService: SubareaService, 
      private dataService: DataService, private store: Store<any>) {
    this.ocupation$ = this.store.select('ocupationReducer');
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

  ngDoCheck() {
    if (!this.logicExecuted) {
      if (this.myDiv) {
        this.calcQntItens(this.leftSide)
        this.logicExecuted = true;
      }
    }
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
    // ------------------------------------------------------------------------------------------------------------

    this.ocupation$.subscribe(
      it => {
        if (!it.local) {
          this.subarea = {...it.parent};
          if (it.list.length != 0) {
            this.subareaService.pesquisarPorId(it.parent.idsubarea).subscribe({
              next: result => {
                this.ocupacoes = OrdemDependency.ordenar(result.ocupacoes);
                this.store.dispatch({type: 'class', payload: { list: [...this.ocupacoes[it.position].classes], parent: this.ocupacoes[it.position] }})
              },
              error: (_) => {
                this.ocupacoes = [...OrdemDependency.ordenar([...it.list])];
                this.store.dispatch({type: 'class', payload: { list: [...this.ocupacoes[it.position].classes], parent: this.ocupacoes[it.position] }})
              }
            })
          }
        }
      }
    )
  }

  addOcupacao(): void{
    if(this.ocupacoes.length < this.ocupations_limit) {
      let ocupation!: Ocupacao;
      const ordem = this.ocupacoes[this.ocupacoes.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        {
          next: result => {
          ocupation = OcupacaoFactory.criarOcupacao(result.janela_c.subareas[0], ordem);
          ocupation.nome = "New";
          ocupation.subarea = this.subarea;
          this.ocupacaoService.inserir(ocupation).subscribe(
            it => {
              this.ocupacoes.push(it)
            }
          )
        },
        error: (_) => {
          this.dataService.getData('null_object', 'first_template').subscribe(
            async it => {
              ocupation = OcupacaoFactory.criarOcupacao(it.janela_c.subareas[0], ordem);
              ocupation.nome = 'New';
              this.ocupacoes.push({...ocupation})
              this.subarea.ocupacoes = [...this.ocupacoes];
              await this.registry.dispatcher('ocupation', [...this.ocupacoes]);
            }
          )
        }
      })
    }
  }

  saveEdit(event: any, i: number) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.executeListing(event.target.value, i);
      }
    }, 1500);
  }

  private executeListing(value: string, index: number) {
    if(value != ''){
      const ocupation = {...this.ocupacoes[index]}
      ocupation.nome = value      
      ocupation.subarea = {...this.subarea};

      this.ocupacaoService.atualizar(ocupation).subscribe(
        {
          next: async _ => {
            this.ocupacoes.splice(index, 1, ocupation)
            await this.registry.dispatcher('ocupation', [...this.ocupacoes]);
          },
          error: async _ => {
            this.ocupacoes.splice(index, 1, ocupation)
            await this.registry.dispatcher('ocupation', [...this.ocupacoes]);
          }
        }
      )
    }
  }

  removerOcupacao(index: number): void{
    if(index != 0){
      let dialogRef = this.dialog.open(RemovalScreenDialogComponent);
      dialogRef.componentInstance.deleteClick.subscribe(
        _ =>{
          this.ocupacaoService.remover(this.ocupacoes[index].idocupacao).subscribe(
          {
            next: async _ => {
              this.ocupacoes.splice(index, 1)
              await this.registry.dispatcher('ocupation', [...this.ocupacoes]);
            },
            error: async _ => {
              this.ocupacoes.splice(index, 1)
              await this.registry.dispatcher('ocupation', [...this.ocupacoes]);
            }
          })
        })
    }
  }

  // ------------------------------------------------------------------------------------------------------------

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
}
