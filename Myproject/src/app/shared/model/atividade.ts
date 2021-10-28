import {Usuario} from "./usuario";
import {Janela} from "./janela";
import {I_nome} from "../interfaces/I_nome";

export class Atividade implements I_nome{
  idatividade!: number;
  nome!: string;
  ordem!: number;
  usuario!: Usuario;
  janelas: Array<Janela> = new Array<Janela>();

  constructor(nome: string) {
    this.nome = nome;
  }
}
