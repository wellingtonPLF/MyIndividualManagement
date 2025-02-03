import {Classe} from "../model/classe";
import {Template} from "../model/template";
import {Ocupacao} from "../model/ocupacao";

export class ClasseFactory{
  public static criarClasse(ocupacao: Ocupacao, ordem: number, tipo: string): Classe{
    const classe = new Classe();
    classe.ordem = ordem;

    if (ocupacao.classes[ordem] == undefined){
      ordem = 0;
    }
    if (tipo == 'casual'){
      classe.padrao = 'easy'
    }
    else if(tipo == 'projeto'){
      classe.padrao = 'extreme'
    }
    else{
      classe.padrao = 'any'
    }

    classe.nome = ocupacao.classes[ordem].nome;
    classe.objectType = 'Classe';
    return {...classe};
  }
}
