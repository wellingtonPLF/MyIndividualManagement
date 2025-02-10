import { INITIAL_WINDOW_STATE } from "./window.state";

export const INITIAL_ACTIVITY_STATE: any = {
    position: 0,
    parent: { id: 0 },
    list: [{
        "idatividade": 0,
        "ordem": 0,
        "nome": "Let's Work",
        "objectType": "Atividade",
        "janelas": INITIAL_WINDOW_STATE.list
    }]
}