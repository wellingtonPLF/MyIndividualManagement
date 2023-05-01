import {Classe} from "./classe";

export class Task{
  idtask!: number;
  nome!: string;
  ordem!: number;
  data!: Date;
  tempo!: string;
  etiqueta!: string;
  encadeamento!: Task;
  classe!: Classe;
  dificuldade!: string;
  objectType!: string;

  constructor() {
  }
}
