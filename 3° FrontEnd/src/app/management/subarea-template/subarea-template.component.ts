import {Component, Inject, OnInit} from '@angular/core';
import {Subarea} from "../../shared/model/subarea";
import {SubareaService} from "../../shared/service/subarea.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {JanelaService} from "../../shared/service/janela.service";
import {Janela} from "../../shared/model/janela";

@Component({
  selector: 'app-subarea-template',
  templateUrl: './subarea-template.component.html',
  styleUrls: ['./subarea-template.component.scss']
})
export class SubareaTemplateComponent implements OnInit {
  janela!:Janela;

  constructor(private janelaService: JanelaService, private subareaService: SubareaService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.janelaService.pesquisarPorId(this.data.idjanela).subscribe(
      it => {
        this.janela = it;
      }
    )
  }

  counter(qnt: number): Array<number>{
    return new Array<number>(qnt)
  }

  changeTipo(event: any, subarea: Subarea): void{
    subarea.tipo = event.target.value
    subarea.janela = this.data
    this.subareaService.atualizar(subarea).subscribe(
      it => {}
    )
  }
}
