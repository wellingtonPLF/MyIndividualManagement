import { INITIAL_USER_STATE } from "src/app/shared/data/user.state";
import { INITIAL_RX_ACTIVITY_STATE } from "./activity.rx_state";

export const INITIAL_RX_USER_STATE: any = {
    ...INITIAL_USER_STATE,
    "atividades": INITIAL_RX_ACTIVITY_STATE.list
}