import {Task} from "../model/task";
import {Classe} from "../model/classe";
import {Projeto} from "../model/projeto";
import {Casual} from "../model/casual";

export class TaskFactory{
  public static criarProjetoTask(dificuldade: string, ordem: number, classe: Classe): Projeto{
    const task = new Projeto();
    task.nome = 'Task';
    task.ordem = ordem;
    task.tempo = this.definirTempo(dificuldade);
    task.dificuldade = dificuldade;
    task.etiqueta = 'undone';
    task.classe = classe;
    task.objectType = 'Task';
    return task;
  }

  public static criarCasualTask(dificuldade: string, ordem: number, classe: Classe): Casual{
    const task = new Casual();
    task.nome = 'Task';
    task.ordem = ordem;
    task.tempo = this.definirTempo(dificuldade);
    task.dificuldade = dificuldade;
    task.etiqueta = 'undone';
    task.classe = classe;
    task.objectType = 'Task';
    return task;
  }

  public static definirTempo(dificuldade: string): string{
    if(dificuldade == 'medium'){
      return '03:00:00'
    }
    else if(dificuldade == 'hard'){
      return '06:00:00'
    }
    else if(dificuldade == 'extreme'){
      return '12:00:00'
    }
    return '01:00:00'
  }
}
