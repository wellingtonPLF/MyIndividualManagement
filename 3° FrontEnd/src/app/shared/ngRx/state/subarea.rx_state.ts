import { RX_Type } from "src/app/shared/types/ngRx";
import { INITIAL_WINDOW_STATE } from "src/app/shared/data/window.state";
import { INITIAL_SUBAREA_STATE } from "src/app/shared/data/subarea.state";
import { INITIAL_RX_OCUPATION_STATE } from "./ocupation.rx_state";

export const INITIAL_RX_SUBAREA_STATE: RX_Type = {
    position: 0,
    local: false,
    parent: INITIAL_WINDOW_STATE,
    list: [{
    ...INITIAL_SUBAREA_STATE,
    "ocupacoes": INITIAL_RX_OCUPATION_STATE.list
}]}