import { testReducer as TestReducer } from "./reducer/test.reducer";

export interface AppState {
    testReducer : any;   
}

export const reducers = {
    testReducer: TestReducer,
}