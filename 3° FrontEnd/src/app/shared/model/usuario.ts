import {Atividade} from "./atividade";
import { Auth } from "./auth";
import {UsuarioTemplate} from "./usuarioTemplate";

export class Usuario{
  idusuario!: number;
  nome!: string;
  email!: string;
  img!: string;
  objectType!: string;
  atividades: Array<Atividade> = new Array<Atividade>();
  usuarioTemplates?: Array<UsuarioTemplate> = new Array<UsuarioTemplate>();

  constructor() {}
}
