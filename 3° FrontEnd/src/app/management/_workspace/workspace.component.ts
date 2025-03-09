import {Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {Janela} from "../../shared/model/janela";
import {Atividade} from "../../shared/model/atividade";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {JanelaService} from "../../shared/service/janela.service";
import {TemplateService} from "../../shared/service/template.service";
import {AtividadeService} from "../../shared/service/atividade.service";
import {JanelaFactory} from "../../shared/factoryDirectory/janelaFactory";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {IndisponivelComponent} from "../indisponivel/indisponivel.component";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {TemplatesComponent} from "../templates/templates.component";
import {SubareaTemplateComponent} from "../subarea-template/subarea-template.component";
import {DialogComponent} from "../../dialogs/dialog/dialog.component";

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/service/data.service';
import { RegistryStore } from 'src/app/shared/ngRx/registryStore';
import { Subarea } from 'src/app/shared/model/subarea';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit  {
  index!: number;
  atividade!: Atividade;
  
  windows!: Array<Janela>;
  window$!: Observable<any>;
  windows_limit: number = 5;
  windowSubscription!: Subscription;

  window!: Janela;
  subarea!: Subarea;

  enable: boolean = true;
  
  constructor(private dialog: MatDialog, private janelaService: JanelaService,  
    private store: Store<any>, 
    private registry: RegistryStore, private dataService: DataService, 
    private templateService: TemplateService, private atividadeService: AtividadeService) {
    this.window$ = this.store.select('windowReducer');
  }

  ngOnInit(): void {
    this.index = 0;
    if (window.location.pathname == "/experience") {
      this.enable = false;
    }

    this.windowSubscription = this.window$.subscribe(
      it => {
        let selectedChild: number | undefined;
        if (it.elementRemoved) {
          selectedChild = it.elementRemoved.value == "subarea" ? it.elementRemoved.position : undefined
        }
        if (!it.local) {
          this.atividade = {...it.parent};
          if (it.list.length != 0) {
            this.index = it.position
            this.atividadeService.pesquisarPorId(it.parent.idatividade).subscribe({
              next: result => {
                this.windows = OrdemDependency.ordenar(result.janelas);
                this.window = this.windows[0];
                this.store.dispatch({type: 'subarea', payload: { position: selectedChild, list: [...this.windows[it.position].subareas], parent: this.windows[it.position] }})
              },
              error: (_) => {
                this.windows = OrdemDependency.ordenar([...it.list]);
                this.window = this.windows[0];
                this.store.dispatch({type: 'subarea', payload: { list: [...this.windows[it.position].subareas], parent: this.windows[it.position] }})
              }
            })
          }
        }
        if (this.index != it.position) {
          this.store.dispatch({type: 'subarea', payload: { list: [...this.windows[it.position].subareas], parent: this.windows[it.position] }})
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.windowSubscription) {
      this.windowSubscription.unsubscribe();
    }
  }

  addJanela(): void{
    if(this.windows.length < this.windows_limit){
      let window!: Janela;
      const ordem = this.windows[this.windows.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        {
          next: result => {
            window = JanelaFactory.criarJanela(result, ordem);
            window.nome = '. . .';
            window.atividade = this.atividade;
            this.janelaService.inserir(window).subscribe(
              it => {
                this.windows.push(it)
              }
            )
          },
          error: (_) => {
            this.dataService.getData('null_object', 'first_template').subscribe(
              async it => {
                window = JanelaFactory.criarJanela(it, ordem);
                window.nome = '. . .';
                this.windows.push({...window})
                this.atividade.janelas = [...this.windows];
                await this.registry.dispatcher('window', [...this.windows]);
              }
            )
          }
        }
      )
    }
  }

  editarJanela(index: number): void {
    const window = this.windows[index];
    let dialogRef = this.dialog.open(EditDialogComponent, {
      data:{
          type: ("janela"),
          datakey: ((window.idjanela? window.idjanela : window.ordem).toString()),
          key: this.atividade
      }
    });

    dialogRef.componentInstance.submitClicked.subscribe(
      {
        next: async (result: any) => {
          this.windows.splice(index, 1, result)
          await this.registry.dispatcher('window', [...this.windows]);
        },
        error: (_: any) => {
          console.log("ERROR EDIT WINDOW!")
        }
      }
    );
  }

  removerJanela(index: number): void {
    if(index != 0){
      let dialogRef = this.dialog.open(RemovalScreenDialogComponent);
      dialogRef.componentInstance.deleteClick.subscribe(
          _ =>{
            if (this.index == index) {
              this.window = this.windows[index - 1];
              this.index = index - 1;
            }
            this.janelaService.remover(this.windows[index].idjanela).subscribe(
              {
                next: async _ => {
                  this.windows.splice(index, 1),
                  await this.registry.dispatcher('window', [...this.windows], this.index);
                },
                error: async _ => {
                  this.windows.splice(index, 1)
                  await this.registry.dispatcher('window', [...this.windows], this.index);
                }
              }
            )  
        }
      );
    }
  }

  enviarJanelas(index: number): void {
    this.store.dispatch({type: 'window', payload: { list: [...this.windows], position: index, local: true }})
    this.index = index;
  }

  throwSubarea(subarea: Subarea): void{
    this.subarea = subarea;
  }

  // ------------------------------------------------------------------------------------------------------------

  openChangeSubarea(): void{
    this.dialog.open(SubareaTemplateComponent, {
      panelClass: 'dialogPadding',
      data: this.windows[this.index]
    })
  }

  openTemplates(): void {
    let dialogRef = this.dialog.open(TemplatesComponent, {
      panelClass: ['dialogPadding','dialogTemplate'],
      data: this.atividade
    });

    dialogRef.componentInstance.changeEmitter.subscribe(
      result => {
        for (let i = 0; i < this.windows.length; i++){
          if (this.windows[i].idjanela == result.idjanela){
            this.windows.splice(i, 1, result)
            this.store.dispatch({type: 'window', payload: { list: [...this.windows], position: this.index }})
          }
        }
      }
    );
  }

  openInfo(): void{
    this.dialog.open(DialogComponent, {
      data: this.window,
      panelClass: 'dialogPadding'
    });
  }

  async openVisualStudio(): Promise<void>{
    //var child_process = require('child_process');
    //child_process.exec("start cmd.exe /K cd..");
    this.dialog.open(IndisponivelComponent)
  }
}
