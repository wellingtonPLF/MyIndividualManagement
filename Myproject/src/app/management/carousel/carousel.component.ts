import {Component, Input, OnInit} from '@angular/core';
import {Classe} from "../../shared/model/classe";
import {Task} from "../../shared/model/task";
import {Ocupacao} from "../../shared/model/ocupacao";
import {ClasseService} from "../../shared/service/classe.service";
import {Router} from "@angular/router";
import {TemplateService} from "../../shared/service/template.service";
import {OrdemDependency} from "../../shared/solid/ordemDependency";
import {ClasseFactory} from "../../shared/factoryDirectory/classeFactory";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TaskFactory} from "../../shared/factoryDirectory/taskFactory";
import {TaskService} from "../../shared/service/task.service";
import {RemovalScreenDialogComponent} from "../removal-screen-dialog/removal-screen-dialog.component";
import {ClasseCreationComponent} from "../classe-creation/classe-creation.component";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  lista!: Array<any>;
  @Input() objeto!: any;
  @Input() dificuldade!: string;
  escolhido!: number;
  pages!: number;
  @Input() qntItens: number = 5;
  resto!: number;
  carousel: string = 'max-width:'+ ((120 * this.qntItens) + 80 + (this.qntItens * 15)) +'px;'
  containerItens: string = 'min-width:'+ ((120 * this.qntItens) + (this.qntItens * 15)) +'px;';

  constructor(public classeService: ClasseService, private router: Router, private dialog: MatDialog,
              public templateService: TemplateService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.escolhido = 0;
  }

  ngOnChanges(): void{
    if(this.objeto != undefined){
      this.carousel = 'max-width:'+ ((120 * this.qntItens) + 80 + (this.qntItens * 15)) +'px;'
      if(this.objeto.objectType == "Ocupacao"){
        this.lista = OrdemDependency.ordenar(this.objeto.classes);
      }
      else if(this.objeto.objectType == "Classe"){
        this.lista = this.refatorarLista(OrdemDependency.ordenar(this.objeto.tasks));
      }
      this.paginas()
      this.resto = this.lista.length - this.multiplo();
    }
  }

  left(): void{
    if(this.escolhido != 0){
      this.escolhido -= 1;
    }
  }

  right(): void{
    if(this.lista != undefined){
      if(this.escolhido != Math.floor(this.lista.length/this.qntItens)){
        this.escolhido += 1;
      }
    }
  }

  paginas(): void{
    if(this.lista != undefined){
      const result = (this.lista.length/this.qntItens);
      this.pages = Math.floor(result);
    }
  }

  multiplo(): number{
    const result = (this.lista.length/this.qntItens);
    return Math.floor(result) * this.qntItens
  }

  counter(qnt: number) {
    return new Array(qnt);
  }

  show(index: any): void{
    if(this.objeto.objectType == 'Ocupacao'){
      this.openClassDialog(index)
    }
    else if(this.objeto.objectType == 'Classe'){
      this.openTaskDialog(index, this.dificuldade, this.lista[index])
    }
  }

  add(): void{
    if(this.objeto.objectType == 'Ocupacao'){
      let classe!: Classe;
      const ordem = this.lista[this.lista.length - 1].ordem + 1;

      this.templateService.pesquisarPorId(1).subscribe(
        result => {
          classe = ClasseFactory.criarClasse(result, ordem);
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
        }
      )
    }
    else if (this.objeto.objectType == 'Classe'){
      let task!: Task;
      let listTask!: Array<Task>;
      let ordem = 0;
      this.classeService.pesquisarPorId(this.objeto.idclasse).subscribe(
        result => {
          if (result.tasks.length != 0){
            listTask = OrdemDependency.ordenar(result.tasks);
            ordem = listTask[result.tasks.length - 1].ordem + 1;
          }
          task = TaskFactory.criarTask(this.dificuldade, ordem, result);

          this.taskService.inserir(task).subscribe(
            it => {
              this.lista.push(it)
              this.resto = this.lista.length - this.multiplo();
              this.paginas()
              if(this.resto == 0){
                this.right()
              }
            }
          )
        }
      )
    }
  }

  refatorarLista(list: Array<Task>): Array<Task>{
    let novaLista = new Array<Task>();
    for(let i of list){
      if(i.dificuldade == this.dificuldade){
        novaLista.push(i)
      }
    }
    return novaLista;
  }

  openTaskDialog(index: number, dificuldade: string, task: Task): void{
    let dialogRef = this.dialog.open(TaskDialogComponent, {
      data:{
        type: (dificuldade),
        datakey: (task.idtask),
        key: this.objeto
      }
    });
    dialogRef.componentInstance.submitClicked.subscribe(
      result => {
        this.lista.splice(index, 1, result)
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
}
