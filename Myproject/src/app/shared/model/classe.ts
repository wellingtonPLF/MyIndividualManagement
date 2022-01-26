import {Ocupacao} from "./ocupacao";
import {Task} from "./task";

export class Classe{
  idclasse!: number;
  nome!: string;
  ordem!: number;
  quando!: string;
  porque!: string;
  oque!: string;
  como!: string;
  ocupacao!: Ocupacao;
  objectType!: string;
  tasks: Array<Task> = new Array<Task>();

  constructor() {
  }
}
