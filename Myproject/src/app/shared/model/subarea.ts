
import {Ocupacao} from "./ocupacao";
import {Janela} from "./janela";

export class Subarea{
  idsubarea!: number;
  nome!: string;
  janela!: Janela;
  ocupacao: Array<Ocupacao> = new Array<Ocupacao>();

  constructor() {
  }
}
