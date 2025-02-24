import { RX_Type } from "src/app/shared/types/ngRx";
import { INITIAL_USER_STATE } from "src/app/shared/data/user.state";
import { INITIAL_ACTIVITY_STATE } from "src/app/shared/data/activity.state";
import { INITIAL_RX_WINDOW_STATE } from "./window.rx_state";

export const INITIAL_RX_ACTIVITY_STATE: RX_Type = {
    position: 0,
    local: false,
    parent: INITIAL_USER_STATE,
    list: [{
        ...INITIAL_ACTIVITY_STATE,
        "janelas": INITIAL_RX_WINDOW_STATE.list
    }]
}