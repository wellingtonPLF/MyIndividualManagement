import {Classe} from "../model/classe";
import {Template} from "../model/template";
import {Ocupacao} from "../model/ocupacao";

export class ClasseFactory{
  public static criarClasse(ocupacao: Ocupacao, ordem: number): Classe{
    const classe = new Classe();
    classe.ordem = ordem;

    if (ocupacao.classes[ordem] == undefined){
      ordem = 0;
    }

    classe.nome = ocupacao.classes[ordem].nome;
    classe.objectType = 'Classe';
    return classe;
  }
}
