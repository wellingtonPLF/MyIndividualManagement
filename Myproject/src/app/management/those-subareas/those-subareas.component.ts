import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subarea} from "../../shared/model/subarea";
import {Janela} from "../../shared/model/janela";
import {JanelaService} from "../../shared/service/janela.service";
import {TemplateService} from "../../shared/service/template.service";
import {Ocupacao} from "../../shared/model/ocupacao";
import {Classe} from "../../shared/model/classe";
import {SubareaService} from "../../shared/service/subarea.service";
import {SubareaFactory} from "../../shared/factoryDirectory/subareaFactory";

@Component({
  selector: 'app-those-subareas',
  templateUrl: './those-subareas.component.html',
  styleUrls: ['./those-subareas.component.scss']
})
export class ThoseSubareasComponent implements OnInit {
  templateName!: String;
  subareas!: Array<Subarea>;
  @Output() subareaEmitter = new EventEmitter<Subarea>();
  @Input() janela!: Janela;

  constructor(public janelaService: JanelaService,
              public templateService: TemplateService,
              public subareaService: SubareaService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void{
    if(this.janela != undefined){
      this.subareas = this.janela.subareas;
      this.janelaService.pesquisarTemplateByIdJanela(this.janela.idjanela).subscribe(
        it => {
          if(it != null){
            this.templateName = it.nome;
          }
        }
      )
      this.subareaEmitter.emit(this.janela.subareas[0]);
    }
  }

  addSubarea(): void{
    let subarea!: Subarea;
    const ordem = this.subareas[this.subareas.length - 1].ordem + 1;

    this.templateService.pesquisarPorId(1).subscribe(
      result => {
        subarea = SubareaFactory.criarSubarea(result, ordem);
        subarea.nome = '. . .';
        subarea.janela = this.janela;

        this.subareaService.inserir(subarea).subscribe(
          result => {
            this.janela.subareas.push(result)
          }
        )
      }
    )
  }

  enviarSubarea(index: number): void{
    this.subareaEmitter.emit(this.janela.subareas[index]);
  }
}
