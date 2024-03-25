import {TaskFactory} from "../factoryDirectory/taskFactory";
import {Atividade} from "../model/atividade";

export class OrdemDependency{
  public static ordenar(child: Array<any>): Array<any>{

    const listaOrdem = Array<number>();
    const entidadesOrdenadas = new Array<any>();

    for(let entity of child){
      listaOrdem.push(entity.ordem);
    }
    listaOrdem.sort();

    for(let i = 0; i < listaOrdem.length; i++){
      for(let j = 0; j < listaOrdem.length; j++){
        if(listaOrdem[i] == child[j].ordem){
          entidadesOrdenadas.push(child[j])
          break
        }
      }
    }
    return  entidadesOrdenadas;
  }
}
