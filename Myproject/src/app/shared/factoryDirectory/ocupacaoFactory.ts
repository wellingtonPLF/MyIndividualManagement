import {Ocupacao} from "../model/ocupacao";
import {Template} from "../model/template";
import {ClasseFactory} from "./classeFactory";

export class OcupacaoFactory{
  public static criarOcupacao(template: Template, ordem: number): Ocupacao{
    const ocupacao = new Ocupacao();
    ocupacao.nome = template.janela_c.subareas[0].ocupacoes[0].nome;
    ocupacao.ordem = ordem;
    ocupacao.classes.push(ClasseFactory.criarClasse(template, 0));
    return ocupacao;
  }
}
