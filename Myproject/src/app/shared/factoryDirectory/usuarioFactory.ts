import {Template} from "../model/template";
import {Usuario} from "../model/usuario";
import {UsuarioTemplate} from "../model/usuarioTemplate";
import {AtividadeFactory} from "./atividadeFactory";

export class UsuarioFactory{
  public static criarUsuario(template: Template, usuario: Usuario): void{
    const userT = new UsuarioTemplate(template);
    userT.objectType = 'UsuarioTemplate';
    usuario.atividades.push(AtividadeFactory.criarAtividade(template, 0));
    usuario.objectType = 'Usuario';
    usuario.usuarioTemplates.push(userT);
  }
}
