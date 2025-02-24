import { INITIAL_ACTIVITY_STATE } from "../activity.state";
import { INITIAL_USER_STATE } from "../user.state";
import { INITIAL_RX_WINDOW_STATE } from "./window_ngRx.state";

export const INITIAL_RX_ACTIVITY_STATE: any = {
    position: 0,
    parent: INITIAL_USER_STATE,
    list: [{
        ...INITIAL_ACTIVITY_STATE,
        "janelas": INITIAL_RX_WINDOW_STATE.list
    }]
}