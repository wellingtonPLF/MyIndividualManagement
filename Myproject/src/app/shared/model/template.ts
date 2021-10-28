import {Janela} from "./janela";
import {Subarea} from "./subarea";
import {Usuario} from "./usuario";

export class Template{
  idtemplate!: number;
  nome!: string;
  usuario!: Usuario;
  janela_c!: Janela;
  janelas: Array<Janela> = new Array<Janela>();

  constructor() {
  }
}
