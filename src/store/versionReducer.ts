import { MainAction, VersionState } from "../type";
import * as actionTypes from "./actionTypes";

const initialState: VersionState = {
    isMobile: false, 
    width: 0
}

const versionReducer = (
    state: VersionState = initialState,
    action: MainAction
):VersionState => {
    switch(action.type) {
        case actionTypes.changeVersion: 
            return {...state, isMobile: action.payload}
        case actionTypes.changeWidth:
            return {...state, width: action.payload}
        default: return state
    }
}

export default versionReducer