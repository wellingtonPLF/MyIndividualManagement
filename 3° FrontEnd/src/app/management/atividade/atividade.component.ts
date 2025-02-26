import {Component, EventEmitter, Input, Output, OnInit, SimpleChanges} from '@angular/core';
import {Atividade} from "../../shared/model/atividade";
import {AtividadeService} from "../../shared/service/atividade.service";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Usuario} from "../../shared/model/usuario";
import {TemplateService} from "../../shared/service/template.service";
import {AtividadeFactory} from "../../shared/factoryDirectory/atividadeFactory";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import { DataService } from 'src/app/shared/service/data.service';
import { Store } from '@ngrx/store';
import { RegistryStore } from 'src/app/shared/ngRx/registryStore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {
  //Index usado para saber em qual parte da lista vc se encontra;
  index!: number;
  @Input() usuario!: Usuario;

  atividades!:  Array<Atividade>;
  activity$!: Observable<any>;
  activity_limit: number = 10;

  constructor(private dataService: DataService, private templateService: TemplateService, private store: Store<any>,
    private atividadeService: AtividadeService, public dialog: MatDialog) {
      this.activity$ = this.store.select('activityReducer');
  }

  ngOnInit(): void {
    this.index = 0;
    this.activity$.subscribe(
      it => {
        if (!it.local) {
          this.atividades = OrdemDependency.ordenar([...it.list])
          this.index = it.position;
          this.store.dispatch({type: 'window', payload: { list: [...this.atividades[it.position].janelas], parent: this.atividades[it.position]}})
        }
        if (this.index != it.position) {
          this.index = it.position;
          this.store.dispatch({type: 'window', payload: { list: [...this.atividades[it.position].janelas], parent: this.atividades[it.position], position: 0 }})
        }
      }
    )
  }

  addAtividade(): void{
    if(this.atividades.length < this.activity_limit) {
      let atv!: Atividade;
      const ordem = this.atividades[this.atividades.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        {
          next: (data) => {
            atv = AtividadeFactory.criarAtividade(data, ordem);
            atv.nome = "New";
            atv.usuario = this.usuario;
            this.atividadeService.inserir(atv).subscribe(
              it => {
                this.atividades.push(it)                
              }
            )
          },
          error: (_) => {
            this.dataService.getData('null_object', 'first_template').subscribe(
              it => {
                atv = AtividadeFactory.criarAtividade(it, ordem);
                atv.nome = "New";
                this.atividades.push({...atv})
                this.usuario.atividades = [...this.atividades];
                this.store.dispatch({type: 'activity', payload: { list: [...this.atividades], local: true }})
              }
            )
          }
        }
      )
    }
  }

  atualizarNome(index: number): void{
    const activity = this.atividades[index];
    let dialogRef = this.dialog.open(EditDialogComponent, {
      data:{
          type: ("atividade"),
          datakey: (activity.idatividade ? activity.idatividade: activity.ordem).toString(),
          key: this.usuario
      }
    });

    dialogRef.componentInstance.submitClicked.subscribe(
      {
        next: (result: any) => {
          this.atividades.splice(index, 1, result)
          this.store.dispatch({type: 'activity', payload: { list: [...this.atividades], local: true }})
        },
        error: (_: any) => {
          console.log("ERROR SUBMIT HERE")
        }
      }
    );
  }

  removerAtividade(index: number): void{
    if(index != 0){
      let dialogRef = this.dialog.open(RemovalScreenDialogComponent);

      dialogRef.componentInstance.deleteClick.subscribe(
        _ => {
          if (this.index == index){
            this.index = index - 1;
          }
          this.atividadeService.remover(this.atividades[index].idatividade).subscribe(
            {
              next: _ => {
                this.atividades.splice(index, 1)
                this.store.dispatch({type: 'activity', payload: { position: this.index, list: [...this.atividades], local: true }})
              },
              error: _ => this.atividades.splice(index, 1)
            }
          )
        }
      );
    }
  }

  enviarAtividades(index: number): void{
    this.store.dispatch({type: 'activity', payload: { list: [...this.atividades], position: index, local: true}})
  }
}
