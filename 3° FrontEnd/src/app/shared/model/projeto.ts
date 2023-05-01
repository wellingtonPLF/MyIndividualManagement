import {Task} from "./task";

export class Projeto extends Task{
  planning!: string;
  fazer!: string;
  pendencia!: string;
  analise!: string;
  bugs!: string;
  melhorias!: string;
  impedimentos!: string;
  information!: string;
}
