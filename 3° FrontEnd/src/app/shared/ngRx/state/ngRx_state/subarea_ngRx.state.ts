import { INITIAL_SUBAREA_STATE } from "../subarea.state";
import { INITIAL_WINDOW_STATE } from "../window.state";
import { INITIAL_RX_OCUPATION_STATE } from "./ocupation_ngRx.state";

export const INITIAL_RX_SUBAREA_STATE: any = {
    position: 0,
    parent: INITIAL_WINDOW_STATE,
    list: [{
    ...INITIAL_SUBAREA_STATE,
    "ocupacoes": INITIAL_RX_OCUPATION_STATE.list
}]}