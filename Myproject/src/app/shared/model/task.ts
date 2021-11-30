import {Classe} from "./classe";

export class Task{
  idtask!: number;
  nome!: string;
  ordem!: number;
  data!: Date;
  tempo!: number;
  descricao!: string;
  comentario!: string;
  etiqueta!: string;
  encadeamento!: Task;
  classe!: Classe;
  dificuldade!: string;
  texto!: string;
  planning!: string;
  fazer!: string;
  pendencia!: string;
  analise!: string;
  conclusao!: string;
  objectType!: string;

  constructor() {
  }
}
