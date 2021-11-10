import {Classe} from "./classe";

export class Task{
  idtask!: number;
  nome!: string;
  ordem!: number;
  data!: Date;
  tempo!: Date;
  descricao!: string;
  comentario!: string;
  etiqueta!: string;
  encadeamento!: Task;
  classe!: Classe;
  dtype!: string;
  texto!: string;
  planning!: string;
  fazer!: string;
  pendencia!: string;
  analise!: string;
  conclusao!: string;

  constructor() {
  }
}
