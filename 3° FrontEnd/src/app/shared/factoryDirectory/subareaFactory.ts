import {Subarea} from "../model/subarea";
import {Template} from "../model/template";
import {OcupacaoFactory} from "./ocupacaoFactory";

export class SubareaFactory{
  public static criarSubarea(template: Template, ordem: number): Subarea{
    const subarea = new Subarea();
    subarea.ordem = ordem;

    if (template.janela_c.subareas[ordem] == undefined){
      ordem = 0;
    }

    const subareaTemplate = template.janela_c.subareas[ordem];
    subarea.objectType = 'Subarea';
    subarea.nome = subareaTemplate.nome;
    subarea.tipo = subareaTemplate.tipo;
    subarea.estilo = subareaTemplate.estilo;

    for (let i = 0; i< template.janela_c.subareas[ordem].ocupacoes.length; i++){
      subarea.ocupacoes.push(OcupacaoFactory.criarOcupacao(subareaTemplate, i));
    }
    return {...subarea};
  }
}
