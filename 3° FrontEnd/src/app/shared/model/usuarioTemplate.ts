import {Usuario} from "./usuario";
import {Template} from "./template";

export class UsuarioTemplate{
  idusuarioTemplate!: number;
  usuario!: Usuario;
  template!: Template;
  objectType!: string;

  constructor(template: Template) {
    this.template = template
  }
}
