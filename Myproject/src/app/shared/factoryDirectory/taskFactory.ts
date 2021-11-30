import {Task} from "../model/task";
import {Classe} from "../model/classe";

export class TaskFactory{
  public static criarTask(dificuldade: string, ordem: number, classe: Classe): Task{
    const task = new Task();
    task.nome = 'Task';
    task.ordem = ordem;
    task.data = new Date();
    task.tempo = Date.now();
    task.dificuldade = dificuldade;
    task.classe = classe;
    task.objectType = 'Task';
    return task;
  }
}
