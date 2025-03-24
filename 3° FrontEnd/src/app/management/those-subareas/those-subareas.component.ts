import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subarea} from "../../shared/model/subarea";
import {Janela} from "../../shared/model/janela";
import {JanelaService} from "../../shared/service/janela.service";
import {TemplateService} from "../../shared/service/template.service";
import {SubareaService} from "../../shared/service/subarea.service";
import {SubareaFactory} from "../../shared/factoryDirectory/subareaFactory";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { RegistryStore } from 'src/app/shared/ngRx/registryStore';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-those-subareas',
  templateUrl: './those-subareas.component.html',
  styleUrls: ['./those-subareas.component.scss']
})
export class ThoseSubareasComponent implements OnInit {
  index!: number;
  janela!: Janela;

  subareas!: Array<Subarea>;
  subarea$!: Observable<any>;
  subareas_limit: number = 5;
  
  subarea!: Subarea;
  templateName!: String;
  selectedSubarea!: Subarea;
  subareaSubscription!: Subscription;

  @Output() subareaEmitter = new EventEmitter<Subarea>();

  constructor(public janelaService: JanelaService, private store: Store<any>, private registry: RegistryStore,
              public templateService: TemplateService, public dialog: MatDialog, private dataService: DataService,
              public subareaService: SubareaService) {
    this.subarea$ = this.store.select('subareaReducer');
  }

  ngOnInit(): void {
    this.index = 0;
    this.subareaSubscription = this.subarea$.subscribe(
      it => {
        if (!it.local) {
          this.janela = {...it.parent};
          if (it.list.length != 0) {
            this.index = it.position
            this.janelaService.pesquisarPorId(it.parent.idjanela).subscribe({
              next: result => {
                this.subareas = OrdemDependency.ordenar(result.subareas);
                this.subarea = this.subareas[0];
                this.subareaEmitter.emit(this.subareas[0]);
                this.store.dispatch({type: 'ocupation', payload: { list: [...this.subareas[it.position].ocupacoes], parent: this.subareas[it.position] }})
              },
              error: (_) => {
                this.subareas = OrdemDependency.ordenar([...it.list]);
                this.subarea = this.subareas[0];
                this.subareaEmitter.emit(this.subareas[0]);
                this.store.dispatch({type: 'ocupation', payload: { list: [...this.subareas[it.position].ocupacoes], parent: this.subareas[it.position] }})
                this.selectedSubarea = this.subarea
              }
            })
            this.janelaService.pesquisarTemplateByIdJanela(this.janela.idjanela).subscribe({
              next: result => {
                if(result != null){
                  this.templateName = result.nome;
                }
              },
              error: (_) => {
                this.templateName = "Default";
              }
            })
          }
        }
        if (this.index != it.position) {
          this.store.dispatch({type: 'ocupation', payload: { list: [...this.subareas[it.position].ocupacoes], parent: this.subareas[it.position] }})
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.subareaSubscription) {
      this.subareaSubscription.unsubscribe();
    }
  }


  addSubarea(): void{
    if(this.subareas.length < this.subareas_limit){
      let subarea!: Subarea;
      const ordem = this.subareas[this.subareas.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        {
          next: result => {
          subarea = SubareaFactory.criarSubarea(result, ordem);
          subarea.nome = '. . .';
          subarea.janela = this.janela;
          this.subareaService.inserir(subarea).subscribe(
            it => {
              this.subareas.push(it)
            }
          )
        },
        error: (_) => {
          this.dataService.getData('null_object', 'first_template').subscribe(
            async it => {
              subarea = SubareaFactory.criarSubarea(it, ordem);
              subarea.nome = '. . .';
              this.subareas.push({...subarea})
              this.janela.subareas = [...this.subareas];
              await this.registry.dispatcher('subarea', [...this.subareas]);
            }
          )
        }
      })
    }
  }

  editarSubarea(index?: number): void{
    const value = (index == undefined) ? this.subareas.indexOf(this.subarea) : index;
    const subarea = this.subareas[value];
    let dialogRef = this.dialog.open(EditDialogComponent, {
      data:{
        type: ("subarea"),
        datakey: (subarea.idsubarea? subarea.idsubarea: subarea.ordem).toString(),
        key: this.janela
      }
    });

    dialogRef.componentInstance.submitClicked.subscribe(
      {
        next: async (result: any) => {
          this.subareas.splice(value, 1, result)
          await this.registry.dispatcher('subarea', [...this.subareas]);
        },
        error: (_: any) => {
          console.log("ERROR EDIT SUBAREA!")
        }
      }
    );
  }

  deleteSubarea(index?: number): void{
    const value = (index == undefined) ? this.subareas.indexOf(this.subarea) : index;
    if(value != 0) {
      let dialogRef = this.dialog.open(RemovalScreenDialogComponent);
      dialogRef.componentInstance.deleteClick.subscribe(
        _ => {
          if (this.index == value){
            this.subarea = this.subareas[value - 1];
            this.subareaEmitter.emit(this.subareas[value - 1]);
            this.index = value - 1;
          }

          this.subareaService.remover(this.subareas[value].idsubarea).subscribe(
            {
              next: async _ => {
              this.subareas.splice(value, 1)
              await this.registry.dispatcher('subarea', [...this.subareas], this.index);
            },
            error: async _ => {
              this.subareas.splice(value, 1)
              await this.registry.dispatcher('subarea', [...this.subareas]);
            }
          })
        }
      )
    }
  }

  enviarSubarea(index?: number): void {
    const value = (index == undefined) ? this.subareas.indexOf(this.selectedSubarea) : index;
    this.store.dispatch({type: 'subarea', payload: { list: [...this.subareas], position: value, local: true }})
    this.index = value;
  }
}
