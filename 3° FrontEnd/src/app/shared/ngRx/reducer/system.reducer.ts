import { INITIAL_RX_ACTIVITY_STATE } from "../state/ngRx_state/activity_ngRx.state";
import { INITIAL_RX_CLASS_STATE } from "../state/ngRx_state/class_ngRx.state";
import { INITIAL_RX_OCUPATION_STATE } from "../state/ngRx_state/ocupation_ngRx.state";
import { INITIAL_RX_SUBAREA_STATE } from "../state/ngRx_state/subarea_ngRx.state";
import { INITIAL_RX_USER_STATE } from "../state/ngRx_state/user_ngRx.state";
import { INITIAL_RX_WINDOW_STATE } from "../state/ngRx_state/window_ngRx.state";

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
            { parent: action.payload.parent, position: action.payload.position, list: action.payload.list } : 
            {...state, position: action.payload.position, list: action.payload.list }
            result = result.position != undefined?
            { ...result } : {...state, parent: result.parent, list: result.list }
            result = result.list != undefined? 
            { ...result } : {...state, parent: result.parent, position: result.position}
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
            { parent: action.payload.parent, position: action.payload.position, list: action.payload.list } : 
            {...state, position: action.payload.position, list: action.payload.list }
            result = result.position != undefined?
            { ...result } : {...state, parent: result.parent, list: result.list }
            result = result.list != undefined? 
            { ...result } : {...state, parent: result.parent, position: result.position}
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
            { parent: action.payload.parent, position: action.payload.position, list: action.payload.list } : 
            {...state, position: action.payload.position, list: action.payload.list }
            result = result.position != undefined?
            { ...result } : {...state, parent: result.parent, list: result.list }
            result = result.list != undefined? 
            { ...result } : {...state, parent: result.parent, position: result.position}
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
            { parent: action.payload.parent, position: action.payload.position, list: action.payload.list } : 
            {...state, position: action.payload.position, list: action.payload.list }
            result = result.position != undefined?
            { ...result } : {...state, parent: result.parent, list: result.list }
            result = result.list != undefined? 
            { ...result } : {...state, parent: result.parent, position: result.position}
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
            { parent: action.payload.parent, position: action.payload.position, list: action.payload.list } : 
            {...state, position: action.payload.position, list: action.payload.list }
            result = result.position != undefined?
            { ...result } : {...state, parent: result.parent, list: result.list }
            result = result.list != undefined? 
            { ...result } : {...state, parent: result.parent, position: result.position}
            return result
        default:
            return state
    }
}
