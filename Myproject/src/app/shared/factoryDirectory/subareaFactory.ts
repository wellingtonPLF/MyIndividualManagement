import {Subarea} from "../model/subarea";
import {Template} from "../model/template";
import {OcupacaoFactory} from "./ocupacaoFactory";

export class SubareaFactory{
  public static criarSubarea(template: Template, ordem: number): Subarea{
    const subarea = new Subarea();
    subarea.nome = template.janela_c.subareas[0].nome;
    subarea.ordem = ordem;
    subarea.ocupacoes.push(OcupacaoFactory.criarOcupacao(template, 0));
    return subarea;
  }
}
