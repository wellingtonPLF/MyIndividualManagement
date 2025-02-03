import { leftSideReducer as LeftSideReducer } from "./reducer/left_slide.reducer";
import { testReducer as TestReducer } from "./reducer/test.reducer";
import { 
    userReducer as UserReducer, 
    activityReducer as ActivityReducer,
    windowReducer as WindowReducer,
    subareaReducer as SubareaReducer,
    ocupationReducer as OcupationReducer,
    classReducer as ClassReducer,
} from "./reducer/system.reducer";

export const reducers: any = {
    testReducer: TestReducer,
    leftSideReducer: LeftSideReducer,
    userReducer: UserReducer,
    activityReducer: ActivityReducer,
    windowReducer: WindowReducer,
    subareaReducer: SubareaReducer,
    ocupationReducer: OcupationReducer,
    classReducer: ClassReducer
}