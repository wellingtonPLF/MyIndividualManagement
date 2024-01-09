
const INITIAL_TEST_STATE: any = 0;

export const testReducer = (state = INITIAL_TEST_STATE, action: any) => {
    switch(action.type){
        case 'increment':
            if (action.payload == undefined){
                return state + 1;
            }
            return state + action.payload;
        case 'decrement':
            if (action.payload == undefined){
                return state - 1;
            }
            return state - action.payload;
        default:
            return state
    }
}