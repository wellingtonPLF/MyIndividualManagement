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
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/service/data.service';
import { RegistryStore } from 'src/app/shared/ngRx/registryStore';

@Component({
  selector: 'app-ocupacao-nominal',
  templateUrl: './ocupacao-nominal.component.html',
  styleUrls: ['./ocupacao-nominal.component.scss']
})
export class OcupacaoNominalComponent implements OnInit {
  show: number | undefined = 0;
  subarea!: Subarea;

  ocupacoes!: Array<Ocupacao>;
  ocupation$!:Observable<any>;
  ocupations_limit: number = 7;

  difficult!: string;
  timeout: any = null;
  qntItens: number = 2;
  leftSide = false;
  variable$!: Observable<any>;
  ocupationSubscription!: Subscription;

  constructor(private ocupacaoService: OcupacaoService, private registry: RegistryStore,
    private dialog: MatDialog, private classService: ClasseService, private fshare: FuncShareService, private dataService: DataService,
    private templateService: TemplateService, private subareaService: SubareaService, private store: Store<any>) {
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
    // ------------------------------------------------------------------------------------------------------------------------------------------------  
    this.ocupationSubscription = this.ocupation$.subscribe(
      it => {
        if (!it.local) {
          this.subarea = {...it.parent};
          if (this.subarea.tipo == "casual"){
            this.difficult = 'easy';
          }
          else if (this.subarea.tipo == "projeto"){
            this.difficult = 'extreme';
          }  
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

  ngOnDestroy(): void {
    if (this.ocupationSubscription) {
      this.ocupationSubscription.unsubscribe();
    }
  }

  addOccupation(): void{
    if(this.ocupacoes.length < this.ocupations_limit){
      let ocupation!: Ocupacao;
      const ordem = this.ocupacoes[this.ocupacoes.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        {
          next: result => {
          ocupation = OcupacaoFactory.criarOcupacao(result.janela_c.subareas[0], ordem);
          ocupation.nome = "Occupation";
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
        $this.execListing(event.target.value, i);
      }
    }, 500);
  }

  execListing(value: string, index: number) {
    if(value != ''){      
      this.classService.pesquisarPorId(this.ocupacoes[index].classes[0].idclasse).subscribe(
        {
          next: async it => {
          it.ocupacao = this.ocupacoes[index];
          it.nome = value;
          this.classService.atualizar(it).subscribe(
            _ => {}
          )
        },
        error: async _ => {
          const ocupations = JSON.parse(JSON.stringify(this.ocupacoes));
          ocupations[index].classes[0].nome = value;
          await this.registry.dispatcher('ocupation', [...ocupations]);
        }
      })
    }
  }

  removerOccupation(index: number): void{
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
  

  showClasse(index: number): void{
    if(this.show == index){
      this.show = undefined;
    }
    else{
      this.store.dispatch({type: 'ocupation', payload: { list: [...this.ocupacoes], position: index, local: true }})
      this.show = index;
    }
  }

  // ------------------------------------------------------------------------------------------------------------------------------------------------

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

  getInfo(index: number): void{
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.ocupacoes[index].classes[0],
      panelClass: 'dialogPadding'
    });

    dialogRef.componentInstance.submitClicked.subscribe(
      async result => {
        const ocupations = JSON.parse(JSON.stringify(this.ocupacoes));
        ocupations[index].classes = [result];
        await this.registry.dispatcher('ocupation', [...ocupations]);
      }
    );
  }
}
