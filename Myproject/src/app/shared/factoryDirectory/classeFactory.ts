import {Classe} from "../model/classe";
import {Template} from "../model/template";

export class ClasseFactory{
  public static criarClasse(template: Template, ordem: number): Classe{
    const classe = new Classe();
    classe.nome = template.janela_c.subareas[0].ocupacoes[0].classes[0].nome;
    classe.objetivo = template.janela_c.subareas[0].ocupacoes[0].classes[0].objetivo;
    classe.porque = template.janela_c.subareas[0].ocupacoes[0].classes[0].porque;
    classe.oque = template.janela_c.subareas[0].ocupacoes[0].classes[0].oque;
    classe.como = template.janela_c.subareas[0].ocupacoes[0].classes[0].como;
    classe.ordem = ordem;
    return classe;
  }
}
