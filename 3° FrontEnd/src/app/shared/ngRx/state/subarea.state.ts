import { INITIAL_OCUPATION_STATE } from "./ocupation.state";

export const INITIAL_SUBAREA_STATE: any = {
    position: 0,
    parent: undefined,
    list: [{
    "idsubarea": 0,
    "nome": "Main",
    "tipo": "casual",
    "estilo": 1,
    "ordem": 0,
    "objectType": "Subarea",
    "ocupacoes": INITIAL_OCUPATION_STATE.list
}]}