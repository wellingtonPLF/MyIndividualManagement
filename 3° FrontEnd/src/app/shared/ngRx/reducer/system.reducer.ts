import { INITIAL_RX_ACTIVITY_STATE } from "../state/activity.rx_state";
import { INITIAL_RX_CLASS_STATE } from "../state/class.rx_state";
import { INITIAL_RX_OCUPATION_STATE } from "../state/ocupation.rx_state";
import { INITIAL_RX_SUBAREA_STATE } from "../state/subarea.rx_state";
import { INITIAL_RX_USER_STATE } from "../state/user.rx_state";
import { INITIAL_RX_WINDOW_STATE } from "../state/window.rx_state";

export const userReducer = (state = INITIAL_RX_USER_STATE, action: any) => {
    switch(action.type){
        case 'user':
            if (action.payload == undefined){
                return state;
            }
            return action.payload;
        default:
            return state
    }
}

export const activityReducer = (state = INITIAL_RX_ACTIVITY_STATE, action: any) => {
    switch(action.type){
        case 'activity':
            if (action.payload == undefined){
                return state;
            }
            let result = action.payload.parent != undefined? 
            { parent: action.payload.parent, position: action.payload.position, list: action.payload.list, local: action.payload.local, elementRemoved: action.payload.elementRemoved } : 
            {...state, position: action.payload.position, list: action.payload.list, local: action.payload.local, elementRemoved: action.payload.elementRemoved }

            result = result.position != undefined?
            { ...result } : {...state, parent: result.parent, list: result.list, local: result.local, elementRemoved: result.elementRemoved }
            result = result.list != undefined? 
            { ...result } : {...state, parent: result.parent, position: result.position, local: result.local, elementRemoved: result.elementRemoved}
            result = result.local != undefined? 
            { ...result } : { parent: result.parent, position: result.position, list: result.list, local: false, elementRemoved: result.elementRemoved }
            return result
        default:
            return state
    }
}

export const windowReducer = (state = INITIAL_RX_WINDOW_STATE, action: any) => {
    switch(action.type){
        case 'window':
            if (action.payload == undefined){
                return state;
            }
            let result = action.payload.parent != undefined? 
            { parent: action.payload.parent, position: action.payload.position, list: action.payload.list, local: action.payload.local, elementRemoved: action.payload.elementRemoved } : 
            {...state, position: action.payload.position, list: action.payload.list, local: action.payload.local, elementRemoved: action.payload.elementRemoved }

            result = result.position != undefined?
            { ...result } : {...state, parent: result.parent, list: result.list, local: result.local, elementRemoved: result.elementRemoved}
            result = result.list != undefined? 
            { ...result } : {...state, parent: result.parent, position: result.position, local: result.local, elementRemoved: result.elementRemoved}
            result = result.local != undefined? 
            { ...result } : { parent: result.parent, position: result.position, list: result.list, local: false, elementRemoved: result.elementRemoved}
            return result
        default:
            return state
    }
}

export const subareaReducer = (state = INITIAL_RX_SUBAREA_STATE, action: any) => {
    switch(action.type){
        case 'subarea':
            if (action.payload == undefined){
                return state;
            }
            let result = action.payload.parent != undefined? 
            { parent: action.payload.parent, position: action.payload.position, list: action.payload.list, local: action.payload.local } : 
            {...state, position: action.payload.position, list: action.payload.list, local: action.payload.local }

            result = result.position != undefined?
            { ...result } : {...state, parent: result.parent, list: result.list, local: result.local }
            result = result.list != undefined? 
            { ...result } : {...state, parent: result.parent, position: result.position, local: result.local}
            result = result.local != undefined? 
            { ...result } : { parent: result.parent, position: result.position, list: result.list, local: false }
            return result
        default:
            return state
    }
}

export const ocupationReducer = (state = INITIAL_RX_OCUPATION_STATE, action: any) => {
    switch(action.type){
        case 'ocupation':
            if (action.payload == undefined){
                return state;
            }
            let result = action.payload.parent != undefined? 
            { parent: action.payload.parent, position: action.payload.position, list: action.payload.list, local: action.payload.local } : 
            {...state, position: action.payload.position, list: action.payload.list, local: action.payload.local }

            result = result.position != undefined?
            { ...result } : {...state, parent: result.parent, list: result.list, local: result.local }
            result = result.list != undefined? 
            { ...result } : {...state, parent: result.parent, position: result.position, local: result.local}
            result = result.local != undefined? 
            { ...result } : { parent: result.parent, position: result.position, list: result.list, local: false }
            return result
        default:
            return state
    }
}

export const classReducer = (state = INITIAL_RX_CLASS_STATE, action: any) => {
    switch(action.type){
        case 'class':
            if (action.payload == undefined){
                return state;
            }
            let result = action.payload.parent != undefined? 
            { parent: action.payload.parent, position: action.payload.position, list: action.payload.list, local: action.payload.local } : 
            {...state, position: action.payload.position, list: action.payload.list, local: action.payload.local }

            result = result.position != undefined?
            { ...result } : {...state, parent: result.parent, list: result.list, local: result.local }
            result = result.list != undefined? 
            { ...result } : {...state, parent: result.parent, position: result.position, local: result.local}
            result = result.local != undefined? 
            { ...result } : { parent: result.parent, position: result.position, list: result.list, local: false }
            return result
        default:
            return state
    }
}
