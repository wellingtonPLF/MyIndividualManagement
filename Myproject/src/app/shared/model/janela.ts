import {Atividade} from "./atividade";
import {Template} from "./template";
import {I_nome} from "../interfaces/I_nome";
import {I_info} from "../interfaces/I_info";
import {Subarea} from "./subarea";

export class Janela implements I_nome, I_info{
  idjanela!: number;
  nome!: string;
  ordem!: number;
  info!: string;
  atividade!: Atividade;
  template!: Template;
  compoeTemplate!: Template;
  objectType!: string;
  subareas: Array<Subarea> = new Array<Subarea>();

  constructor() {
  }
}
