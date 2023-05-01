import {Ocupacao} from "./ocupacao";
import {Casual} from "./casual";
import {Projeto} from "./projeto";
import {I_info} from "../interfaces/I_info";

export class Classe implements I_info{
  idclasse!: number;
  nome!: string;
  ordem!: number;
  padrao!: string;
  quando!: string;
  info!: string;
  porque!: string;
  oque!: string;
  como!: string;
  ocupacao!: Ocupacao;
  objectType!: string;
  casual: Array<Casual> = new Array<Casual>();
  projeto: Array<Projeto> = new Array<Projeto>();

  constructor() {
  }
}
