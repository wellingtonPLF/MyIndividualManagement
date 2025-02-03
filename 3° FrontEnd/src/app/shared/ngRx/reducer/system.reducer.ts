import { INITIAL_ACTIVITY_STATE } from "../state/activity.state";
import { INITIAL_CLASS_STATE } from "../state/class.state";
import { INITIAL_OCUPATION_STATE } from "../state/ocupation.state";
import { INITIAL_SUBAREA_STATE } from "../state/subarea.state";
import { INITIAL_USER_STATE } from "../state/user.state";
import { INITIAL_WINDOW_STATE } from "../state/window.state";

export const userReducer = (state = INITIAL_USER_STATE, action: any) => {
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

export const activityReducer = (state = INITIAL_ACTIVITY_STATE, action: any) => {
    switch(action.type){
        case 'activity':
            if (action.payload == undefined){
                return state;
            }
            if (action.payload.position == undefined) {
                return { ...state, list: action.payload.list};
            }
            if (action.payload.list == undefined) {
                return { ...state, position: action.payload.position};
            }
            return action.payload;
        default:
            return state
    }
}

export const windowReducer = (state = INITIAL_WINDOW_STATE, action: any) => {
    switch(action.type){
        case 'window':
            if (action.payload == undefined){
                return state;
            }
            if (action.payload.position == undefined) {
                return { ...state, list: action.payload.list};
            }
            if (action.payload.list == undefined) {
                return { ...state, position: action.payload.position};
            }
            return action.payload;
        default:
            return state
    }
}

export const subareaReducer = (state = INITIAL_SUBAREA_STATE, action: any) => {
    switch(action.type){
        case 'subarea':
            if (action.payload == undefined){
                return state;
            }
            if (action.payload.position == undefined) {
                return { ...state, list: action.payload.list};
            }
            if (action.payload.list == undefined) {
                return { ...state, position: action.payload.position};
            }
            return action.payload;
        default:
            return state
    }
}

export const ocupationReducer = (state = INITIAL_OCUPATION_STATE, action: any) => {
    switch(action.type){
        case 'ocupation':
            if (action.payload == undefined){
                return state;
            }
            if (action.payload.position == undefined) {
                return { ...state, list: action.payload.list};
            }
            if (action.payload.list == undefined) {
                return { ...state, position: action.payload.position};
            }
            return action.payload;
        default:
            return state
    }
}

export const classReducer = (state = INITIAL_CLASS_STATE, action: any) => {
    switch(action.type){
        case 'class':
            if (action.payload == undefined){
                return state;
            }
            if (action.payload.position == undefined) {
                return { ...state, list: action.payload.list};
            }
            if (action.payload.list == undefined) {
                return { ...state, position: action.payload.position};
            }
            return action.payload;
        default:
            return state
    }
}
