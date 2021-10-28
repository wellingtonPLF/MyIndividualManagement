import {Atividade} from "./atividade";
import {Template} from "./template";

export class Usuario{
  idusuario!: number;
  nome!: string;
  email!: string;
  senha!: string;
  img!: string;
  token!: string;
  atividades: Array<Atividade> = new Array<Atividade>();
  templates: Array<Template> = new Array<Template>();

  constructor() {
  }
}
