
const INITIAL_LEFT_SLIDE_STATE: boolean = false;

export const leftSideReducer = (state = INITIAL_LEFT_SLIDE_STATE, action: any) => {
    switch(action.type){
        case 'hideLeftSide':
            if (action.payload == undefined){
                return state;
            }
            return action.payload;
        default:
            return state
    }
}