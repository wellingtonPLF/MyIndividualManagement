import { INITIAL_CLASS_STATE } from "../class.state";
import { INITIAL_OCUPATION_STATE } from "../ocupation.state";

export const INITIAL_RX_CLASS_STATE: any = {
    position: 0,
    parent: INITIAL_OCUPATION_STATE,
    list: [{
        ...INITIAL_CLASS_STATE
    }]
}