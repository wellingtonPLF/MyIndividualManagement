import { INITIAL_CLASS_STATE } from "src/app/shared/data/class.state";
import { INITIAL_OCUPATION_STATE } from "src/app/shared/data/ocupation.state";
import { RX_Type } from "src/app/shared/types/ngRx";

export const INITIAL_RX_CLASS_STATE: RX_Type = {
    position: 0,
    local: false,
    parent: INITIAL_OCUPATION_STATE,
    list: [{
        ...INITIAL_CLASS_STATE
    }]
}