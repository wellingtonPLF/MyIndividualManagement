
import {Ocupacao} from "./ocupacao";
import {Janela} from "./janela";
import {I_nome} from "../interfaces/I_nome";

export class Subarea implements I_nome{
  idsubarea!: number;
  nome!: string;
  ordem!: number;
  janela!: Janela;
  objectType!: string;
  ocupacoes: Array<Ocupacao> = new Array<Ocupacao>();

  constructor() {
  }
}
