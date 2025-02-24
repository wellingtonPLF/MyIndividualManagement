import { Activity_Type } from "src/app/shared/types/system";
import { INITIAL_ACTIVITY_STATE } from "../activity.state";
import { INITIAL_WINDOW_STATE } from "../window.state";
import { INITIAL_RX_SUBAREA_STATE } from "./subarea_ngRx.state";
import { Window_RX_Type } from "src/app/shared/types/ngRx";

export const INITIAL_RX_WINDOW_STATE: Window_RX_Type = {
    position: 0,
    parent: INITIAL_ACTIVITY_STATE,
    list: [{
        ...INITIAL_WINDOW_STATE,
        "subareas": INITIAL_RX_SUBAREA_STATE.list
    }]
}