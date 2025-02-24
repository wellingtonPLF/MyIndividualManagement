import { INITIAL_OCUPATION_STATE } from "../ocupation.state";
import { INITIAL_SUBAREA_STATE } from "../subarea.state";
import { INITIAL_RX_CLASS_STATE } from "./class_ngRx.state";

export const INITIAL_RX_OCUPATION_STATE: any = {
    position: 0,
    parent: INITIAL_SUBAREA_STATE,
    list: [{
    ...INITIAL_OCUPATION_STATE,
    "classes": INITIAL_RX_CLASS_STATE.list
}]}