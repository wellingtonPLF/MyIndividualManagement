
import {Ocupacao} from "./ocupacao";
import {Janela} from "./janela";

export class Subarea{
  idsubarea!: number;
  nome!: string;
  ordem!: number;
  janela!: Janela;
  ocupacoes: Array<Ocupacao> = new Array<Ocupacao>();

  constructor() {
  }
}
