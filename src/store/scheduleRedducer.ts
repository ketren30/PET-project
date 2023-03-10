import * as actionTypes from './actionTypes';
import * as types from '../type';
const initialState = {
    timetable: [],
    loading: false,
    isModal: false,
    changingCell: []
}

const scheduleReducer = (
    state: types.ScheduleState = initialState,
    action: types.MainAction
): types.ScheduleState => {
    switch(action.type) {
        case actionTypes.hideModal:
            return {...state, isModal: false}
        case actionTypes.showModal:
            return {...state, isModal: true}
        case actionTypes.fetchSchedule:
            return {...state, timetable: action.payload}
        case actionTypes.showLoading:
            return {...state, loading: true}
        case actionTypes.hideLoading:
            return {...state, loading: false}
        case actionTypes.chooseCell:
            return {...state, changingCell: action.payload}
        case actionTypes.editSchedule: {
            const ind1=state.changingCell[0];
            const ind2=state.changingCell[1];
            const ind3=state.changingCell[2];
            const newTimetable = state.timetable;
            newTimetable[ind1][ind2][ind3]=action.payload;
            return {...state, timetable: newTimetable} 
        }
        case actionTypes.deleteLesson : {
            const ind1=state.changingCell[0];
            const ind2=state.changingCell[1];
            const ind3=state.changingCell[2];
            let newTimetable = state.timetable;
            newTimetable[ind1][ind2][ind3]={};
            return {...state, timetable: newTimetable}
        }
    }
    return state
}

export default scheduleReducer