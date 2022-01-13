import {Ocupacao} from "../model/ocupacao";
import {Template} from "../model/template";
import {ClasseFactory} from "./classeFactory";
import {Subarea} from "../model/subarea";

export class OcupacaoFactory{
  public static criarOcupacao(subarea: Subarea, ordem: number): Ocupacao{
    const ocupacao = new Ocupacao();
    ocupacao.ordem = ordem;

    if (subarea.ocupacoes[ordem] == undefined){
      ordem = 0;
    }

    ocupacao.nome = subarea.ocupacoes[ordem].nome;
    ocupacao.objectType = 'Ocupacao';
    ocupacao.classes.push(ClasseFactory.criarClasse(subarea.ocupacoes[ordem], 0));
    return ocupacao;
  }
}
