import { Activity_Type } from "../../types/system";
import { INITIAL_WINDOW_STATE } from "./window.state";

export const INITIAL_ACTIVITY_STATE: Activity_Type = {
    "idatividade": 0,
    "ordem": 0,
    "nome": "Let's Work",
    "objectType": "Atividade",
    "janelas": [INITIAL_WINDOW_STATE]
}