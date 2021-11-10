import {Ocupacao} from "./ocupacao";

export class Classe{
  idclasse!: number;
  nome!: string;
  ordem!: number;
  objetivo!: string;
  porque!: string;
  oque!: string;
  como!: string;
  ocupacao!: Ocupacao;
  tasks: Array<Task> = new Array<Task>();

  constructor() {
  }
}
