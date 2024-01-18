import { leftSideReducer as LeftSideReducer } from "./reducer/left_slide.reducer";
import { testReducer as TestReducer } from "./reducer/test.reducer";

export interface AppState {
    testReducer : any;   
}

export const reducers = {
    testReducer: TestReducer,
    leftSideReducer: LeftSideReducer
}