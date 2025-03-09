import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Classe} from "../../shared/model/classe";
import {Task} from "../../shared/model/task";
import {ClasseService} from "../../shared/service/classe.service";
import {Router} from "@angular/router";
import {TemplateService} from "../../shared/service/template.service";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {ClasseFactory} from "../../shared/factoryDirectory/classeFactory";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TaskFactory} from "../../shared/factoryDirectory/taskFactory";
import {TaskService} from "../../shared/service/task.service";
import {ClasseCreationComponent} from "../classe-creation/classe-creation.component";
import {CasualService} from "../../shared/service/casual.service";
import {ProjetoService} from "../../shared/service/projeto.service";
import {Projeto} from "../../shared/model/projeto";
import {Casual} from "../../shared/model/casual";
import {TaskProjectComponent} from "../task-project/task-project.component";
import { RegistryStore } from 'src/app/shared/ngRx/registryStore';
import { DataService } from 'src/app/shared/service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  lista!: Array<any>;
  @Input() subareaTipo!: string;
  @Input() objeto!: any;
  @Input() dificuldade!: string;
  @Input() qntItens: number = 2;
  //Usado para saber qual pagina está sendo exibida na lista
  escolhido!: number;
  pages!: number;
  resto!: number;
  //Usado quando o button add for removido
  showAdd: number = 1;

  constructor(public classeService: ClasseService,
    private registry: RegistryStore, private dataService: DataService, 
    private dialog: MatDialog, public templateService: TemplateService,
    private casualService: CasualService, private projetoService: ProjetoService) {
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.dificuldade == 'any'){
      this.showAdd = 0;
    }
    this.escolhido = 0;  
    if(this.objeto != undefined){
      if(this.objeto.objectType == "Ocupacao"){
        this.lista = OrdemDependency.ordenar(this.objeto.classes);
      }
      else if(this.objeto.objectType == "Classe"){
        if (this.subareaTipo == "Projeto") {
          const listaRef = this.refatorarLista(this.objeto.projeto);
          this.lista = OrdemDependency.ordenar(listaRef);
        }
        else {
          const listaRef = this.refatorarLista(this.objeto.casual);
          this.lista = OrdemDependency.ordenar(listaRef)
        }
      }
      else {
        this.lista = [...this.objeto]
      }      
      this.paginas()
      this.resto = (this.lista.length ?? 0) - this.multiplo();
    }  
  }

  refatorarLista(list: Array<Task>): Array<Task>{
    let novaLista = new Array<Task>();
    novaLista = list.filter( (item: Task) => item.dificuldade == this.dificuldade && item.etiqueta != 'success')
    return novaLista;
  }

  add(): void{
    if(this.objeto.objectType == 'Ocupacao'){
      let classe!: Classe;
      const ordem = this.lista[this.lista.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        {
          next: result => {
          const subarea = result.janela_c.subareas[0]
          classe = ClasseFactory.criarClasse(subarea.ocupacoes[0], ordem, subarea.tipo);
          classe.nome = "New";
          classe.ocupacao = this.objeto;
          this.classeService.inserir(classe).subscribe(
            it => {
              this.lista.push(it)
              this.resto = this.lista.length - this.multiplo();
              this.paginas()
              if(this.resto == 0){
                this.right()
              }
            }
          )
        },
        error: (_) => {}
      })
    }
    else if (this.objeto.objectType == 'Classe'){
      let listTask!: Array<Task>;
      let ordem = 0;
      this.classeService.pesquisarPorId(this.objeto.idclasse).subscribe(
        {
          next: result => {
          if(this.subareaTipo == 'projeto'){
            if (result.projeto.length != 0){
              listTask = OrdemDependency.ordenar(result.projeto);
              ordem = listTask[result.projeto.length - 1].ordem + 1;
            }
            let task!: Projeto;
            task = TaskFactory.criarProjetoTask(this.dificuldade, ordem, result);
            this.projetoService.inserir(task).subscribe(
              it => {
                this.lista.push(it)
                this.objeto.projeto.push(it)
                this.resto = this.lista.length - this.multiplo();
                this.paginas()
                if(this.resto == 0){
                  this.right()
                }
              }
            )
          }
          else if(this.subareaTipo == 'casual'){
            if (result.casual.length != 0){
              listTask = OrdemDependency.ordenar(result.casual);
              ordem = listTask[result.casual.length - 1].ordem + 1;
            }
            let task!: Casual;
            task = TaskFactory.criarCasualTask(this.dificuldade, ordem, result);
            this.casualService.inserir(task).subscribe(
              it => {
                this.lista.push(it)
                this.objeto.casual.push(it)
                this.resto = this.lista.length - this.multiplo();
                this.paginas()
                if(this.resto == 0){
                  this.right()
                }
              }
            )
          }
        },
        error: (_) => {
          if(this.subareaTipo == 'casual'){
            this.dataService.getData('null_object', 'first_template').subscribe(
              async it => {
                if (this.objeto.casual.length != 0){
                  listTask = OrdemDependency.ordenar(this.objeto.casual);
                  ordem = listTask[this.objeto.casual.length - 1].ordem + 1;
                }
                let task!: Casual;
                const classe = it.janela_c.subareas[0].ocupacoes[0].classes[0]
                task = TaskFactory.criarCasualTask(this.dificuldade, ordem, classe);
                
                this.lista.push({...task});
                const saveClass: Classe = {...this.objeto};
                saveClass.casual = [...this.lista];

                await this.registry.dispatcher('class', [saveClass]);
              }
            )
          }
          else if(this.subareaTipo == 'projeto'){}
        }
      })
    }
  }

  openTaskDialog(index: number, task: Task): void {
    if (this.subareaTipo == 'projeto' || task.dificuldade == 'extreme'){
      let dialogRef = this.dialog.open(TaskProjectComponent, {
        data:{
          datakey: (task.idtask),
          key: this.objeto
        },
        panelClass: ['dialogPadding', 'full-screen-modal']
      });

      dialogRef.componentInstance.submitClicked.subscribe(
        result => {
          if(result.etiqueta == 'success' || (result.data == null && this.dificuldade == 'any')){
            this.lista.splice(index, 1)
            this.resto = this.lista.length - this.multiplo();
            this.paginas()
          }
          else{
            this.lista.splice(index, 1, result)
          }
        }
      );

      dialogRef.componentInstance.removedClicked.subscribe(
        it => {
          dialogRef.close()
          this.lista.splice(index, 1)
          this.resto = this.lista.length - this.multiplo();
          this.paginas()
        }
      )
    }
    else if(this.subareaTipo == 'casual' ||
      (task.dificuldade == 'easy' || task.dificuldade == 'medium' || task.dificuldade == 'hard')){
      let dialogRef = this.dialog.open(TaskDialogComponent, {
        data:{
          datakey: index,
          key: { casual: this.lista }
        },
        panelClass: 'taskFile'
      });

      dialogRef.componentInstance.submitClicked.subscribe(
        async result => {
          if(result.etiqueta == 'success' || (result.data == null && this.dificuldade == 'any')){
            this.lista.splice(index, 1)
            this.resto = this.lista.length - this.multiplo();
            this.paginas()
          }
          else{
            if (isNaN(result.data)) {
              result.data = undefined;
            }
            this.lista.splice(index, 1, result)            
          }
          const saveClass: Classe = {...this.objeto};
          saveClass.casual = [...this.lista];
          await this.registry.dispatcher('class', [saveClass]);
        }
      );

      dialogRef.componentInstance.removedClicked.subscribe(
        async _ => {
          dialogRef.close()
          this.lista.splice(index, 1)
          this.resto = this.lista.length - this.multiplo();
          this.paginas()

          const saveClass: Classe = {...this.objeto};
          saveClass.casual = [...this.lista];
          await this.registry.dispatcher('class', [saveClass]);
        }
      )
    }
  }

  openClassDialog(index: number): void{
    let dialogRef = this.dialog.open(ClasseCreationComponent, {
      data:{
        datakey: (this.lista[index].idclasse)
      },
      panelClass: 'full-screen-modal'
    })

    dialogRef.componentInstance.updateClick.subscribe(
      result => {
        this.lista.splice(index, 1, result)
      }
    );

    dialogRef.componentInstance.removedClick.subscribe(
      it => {
        dialogRef.close()
        this.lista.splice(index, 1)
        this.resto = this.lista.length - this.multiplo();
        this.paginas()
      }
    )
  }

  // ---------------------------------------------------------------------------------------------------

  borderDate(lista: any): boolean{
    const today = new Date()
    const year = today.getFullYear()
    let month: String | number = today.getMonth() + 1
    let day: String | number = today.getDate()
    if(month < 10){
      month = `0${month}`
    }
    if(day < 10){
      day = `0${day}`
    }
    const date = `${year}-${month}-${day}`
    const myDate = lista.data
    return date == myDate
  }

  left(): void{
    if(this.escolhido != 0){
      this.escolhido -= 1;
    }
  }

  right(): void{
    if(this.lista != undefined){
      if(this.resto == 0 && this.dificuldade == 'any' && this.lista.length != 0){
        if(this.escolhido != this.calc() - 1){
          this.escolhido += 1;
        }
      }
      else if(this.escolhido != this.calc()){
        this.escolhido += 1;
      }
    }
  }

  calc(): number{
    const listLenght = this.lista.length ?? 0;
    const result = (listLenght/this.qntItens);
    return Math.floor(result);
  }

  paginas(): void{
    if(this.lista != undefined){
      this.pages = this.calc();
    }
  }

  multiplo(): number{
    return this.calc() * this.qntItens
  }

  counter(qnt: number) {
    return new Array(qnt);
  }

  show(index: any): void{
    if(this.objeto.objectType == 'Ocupacao'){
      this.openClassDialog(index)
    }
    else{
      this.openTaskDialog(index, this.lista[index])
    }
  }
}
