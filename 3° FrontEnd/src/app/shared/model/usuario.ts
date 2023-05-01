import {Atividade} from "./atividade";
import {Template} from "./template";
import {UsuarioTemplate} from "./usuarioTemplate";

export class Usuario{
  idusuario!: number;
  nome!: string;
  email!: string;
  senha!: string;
  img!: string;
  token!: string;
  objectType!: string;
  atividades: Array<Atividade> = new Array<Atividade>();
  usuarioTemplates: Array<UsuarioTemplate> = new Array<UsuarioTemplate>();

  constructor() {
  }
}
