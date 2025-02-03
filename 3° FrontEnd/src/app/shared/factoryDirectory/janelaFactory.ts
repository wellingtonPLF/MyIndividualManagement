import {Janela} from "../model/janela";
import {Template} from "../model/template";
import {SubareaFactory} from "./subareaFactory";

export class JanelaFactory{
  public static criarJanela(template: Template, ordem: number): Janela{
    const janela = new Janela();
    janela.nome = template.janela_c.nome;
    janela.ordem = ordem;
    janela.template = template;
    janela.objectType = 'Janela';
    for (let i = 0; i< template.janela_c.subareas.length; i++){
      janela.subareas.push(SubareaFactory.criarSubarea(template, i));
    }
    return {...janela};
  }
}
