import {Janela} from "./janela";
import {UsuarioTemplate} from "./usuarioTemplate";

export class Template{
  idtemplate!: number;
  nome!: string;
  usuarioTemplates: Array<UsuarioTemplate> = new Array<UsuarioTemplate>();
  janela_c!: Janela;
  objectType!: string;
  janelas: Array<Janela> = new Array<Janela>();

  constructor() {
  }
}
