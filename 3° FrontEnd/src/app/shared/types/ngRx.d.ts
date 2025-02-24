import { Activity_Type } from "./system"

export type RX_Type = {
    local: boolean,
    position: number,
    parent: Activity_Type,
    list: Array<any>
}
