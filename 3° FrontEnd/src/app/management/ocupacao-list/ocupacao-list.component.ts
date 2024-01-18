import {Component, Input, OnInit} from '@angular/core';
import {Subarea} from "../../shared/model/subarea";
import {Ocupacao} from "../../shared/model/ocupacao";
import {OcupacaoService} from "../../shared/service/ocupacao.service";
import {MatDialog} from "@angular/material/dialog";
import {ClasseService} from "../../shared/service/classe.service";
import {TemplateService} from "../../shared/service/template.service";
import {SubareaService} from "../../shared/service/subarea.service";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {TaskService} from "../../shared/service/task.service";
import {SessionStorageService} from "../../shared/service/session-storage.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";
import {CasualService} from "../../shared/service/casual.service";
import {ProjetoService} from "../../shared/service/projeto.service";
import {forkJoin} from "rxjs";
import {Casual} from "../../shared/model/casual";

@Component({
  selector: 'app-ocupacao-list',
  templateUrl: './ocupacao-list.component.html',
  styleUrls: ['./ocupacao-list.component.scss']
})
export class OcupacaoListComponent implements OnInit {
  show: number | undefined = 0;
  @Input() subarea!: Subarea;
  ocupacoes!: Array<Ocupacao>;
  lista: Array<any> = [];
  qntItens: number = 2;
  timeout: any = null;

  constructor(private ocupacaoService: OcupacaoService, private casualService: CasualService,
              private projetoService: ProjetoService,
              private dialog: MatDialog, private classService: ClasseService,
              private accountService: SessionStorageService,
              private accountServiceLocal: LocalStorageService,
              private templateService: TemplateService, private subareaService: SubareaService) {

  }

  ngOnInit(): void {
    let usuarioID = this.accountService.getToken();

    if (usuarioID == null){
      usuarioID = this.accountServiceLocal.getToken();

      if(usuarioID == null){
        usuarioID = "0";
      }
    }

    this.casualService.getRequestCasualTask(usuarioID).subscribe(
      it => {
        this.projetoService.getRequestProjectTask(usuarioID).subscribe(
          result => {
            this.lista[0] = it.concat(result);
          }
        )
      }
    )
    //===========================================================================

    this.casualService.getIfDiariasPendente().subscribe(
      response => {
        this.casualService.getRequestLate(usuarioID).subscribe(
          it => {
            for (let i of it){
              for(let j of response){
                if (i.idtask == j.idtask){
                  it.splice(it.indexOf(i), 1)
                }
              }
            }
            this.projetoService.getRequestLate(usuarioID).subscribe(
              result => {
                this.lista[1] = it.concat(result);
              }
            )
          }
        )

        for (let i of response){
          this.casualService.pesquisarClassePorIdTask(i.idtask).subscribe(
            classe => {
              this.casualService.pesquisarPorId(i.idtask).subscribe(
                casualTask => {
                  casualTask.classe = classe;
                  casualTask.data = new Date('');
                  casualTask.etiqueta = 'undone';
                  this.casualService.atualizar(casualTask).subscribe(
                    atualizado => {}
                  )
                }
              )
            }
          )
        }
      }
    )
    //===========================================================================

    this.casualService.getRequestUndefined(usuarioID).subscribe(
      it => {
        this.projetoService.getRequestUndefined(usuarioID).subscribe(
          result => {
            this.lista[2] = it.concat(result);
          }
        )
      }
    )
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

  showClasse(index: number): void{
    if(this.show == index){
      this.show = undefined;
    }
    else{
      this.show = index;
    }
  }
}
