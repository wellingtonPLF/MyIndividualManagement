import {Atividade} from "./atividade";
import {Template} from "./template";
import {I_nome} from "../interfaces/I_nome";
import {Subarea} from "./subarea";

export class Janela implements I_nome{
  idjanela!: number;
  nome!: string;
  ordem!: number;
  atividade!: Atividade;
  template!: Template;
  compoeTemplate!: Template;
  subareas: Array<Subarea> = new Array<Subarea>();

  constructor() {
  }
}
