import {Subarea} from "./subarea";
import {Classe} from "./classe";

export class Ocupacao{
  idocupacao!: number;
  nome!: string;
  ordem!: number;
  objectType!: string;
  subarea!: Subarea;
  classes: Array<Classe> = new Array<Classe>();

  constructor() {
  }
}
