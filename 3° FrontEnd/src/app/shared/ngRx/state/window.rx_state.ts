import { Activity_Type } from "src/app/shared/types/system";
import { RX_Type } from "src/app/shared/types/ngRx";
import { INITIAL_ACTIVITY_STATE } from "src/app/shared/data/activity.state";
import { INITIAL_WINDOW_STATE } from "src/app/shared/data/window.state";
import { INITIAL_RX_SUBAREA_STATE } from "./subarea.rx_state";

export const INITIAL_RX_WINDOW_STATE: RX_Type = {
    position: 0,
    local: false,
    elementRemoved: undefined,
    parent: INITIAL_ACTIVITY_STATE,
    list: [{
        ...INITIAL_WINDOW_STATE,
        "subareas": INITIAL_RX_SUBAREA_STATE.list
    }]
}