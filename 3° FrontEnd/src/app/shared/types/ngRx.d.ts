import { Activity_Type } from "./system"

export type SelectionType = {
    value: string,
    position: number
}

export type RX_Type = {
    local: boolean,
    position: number,
    elementRemoved?: SelectionType,
    parent: Activity_Type,
    list: Array<any>
}
