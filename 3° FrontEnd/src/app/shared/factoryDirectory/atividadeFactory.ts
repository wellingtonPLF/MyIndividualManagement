import {Atividade} from "../model/atividade";
import {Template} from "../model/template";
import {JanelaFactory} from "./janelaFactory";

export class AtividadeFactory{
  public static criarAtividade(template: Template, ordem: number): Atividade{
    const atividade = new Atividade("Let's Work");
    atividade.ordem = ordem;
    atividade.objectType = 'Atividade';
    atividade.janelas.push(JanelaFactory.criarJanela(template, 0));
    return atividade;
  }
}
