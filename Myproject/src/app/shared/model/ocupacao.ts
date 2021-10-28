import {Subarea} from "./subarea";
import {Classe} from "./classe";

export class Ocupacao{
  idocupacao!: number;
  nome!: string;
  subarea!: Subarea;
  classes: Array<Classe> = new Array<Classe>();

  constructor() {
  }
}
