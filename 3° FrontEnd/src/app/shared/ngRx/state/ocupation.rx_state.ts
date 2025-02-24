import { RX_Type } from "src/app/shared/types/ngRx";
import { INITIAL_SUBAREA_STATE } from "src/app/shared/data/subarea.state";
import { INITIAL_OCUPATION_STATE } from "src/app/shared/data/ocupation.state";
import { INITIAL_RX_CLASS_STATE } from "./class.rx_state";

export const INITIAL_RX_OCUPATION_STATE: RX_Type = {
    position: 0,
    local: false,
    parent: INITIAL_SUBAREA_STATE,
    list: [{
    ...INITIAL_OCUPATION_STATE,
    "classes": INITIAL_RX_CLASS_STATE.list
}]}