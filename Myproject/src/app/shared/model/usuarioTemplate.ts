import {Usuario} from "./usuario";
import {Template} from "./template";

export class UsuarioTemplate{
  idusuarioTemplate!: number;
  usuario!: Usuario;
  template!: Template;

  constructor(template: Template) {
    this.template = template
  }
}
