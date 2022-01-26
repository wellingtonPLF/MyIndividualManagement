import {Task} from "../model/task";
import {Classe} from "../model/classe";

export class TaskFactory{
  public static criarTask(dificuldade: string, ordem: number, classe: Classe): Task{
    const task = new Task();
    task.nome = 'Task';
    task.ordem = ordem;
    task.tempo = this.definirTempo(dificuldade);
    task.dificuldade = dificuldade;
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
    return '00:00:00'
  }
}
