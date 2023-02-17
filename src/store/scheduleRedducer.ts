import * as actionTypes from './actionTypes';
import * as types from '../type';
const initialState = {
    timetable: [],
    loading: false,
    isVisible: false,
    changingCell: []
}

const scheduleReducer = (
    state: types.ScheduleState = initialState,
    action: types.MainAction
): types.ScheduleState => {
    switch(action.type) {
        case actionTypes.changeVisibility:
            return {...state, isVisible: !state.isVisible}
        case actionTypes.fetchSchedule:
            return {...state, timetable: action.payload}
        case actionTypes.showLoading:
            return {...state, loading: true}
        case actionTypes.hideLoading:
            return {...state, loading: false}
        case actionTypes.chooseCell:
            console.log(action.payload)
            return {...state, changingCell: action.payload}
        case actionTypes.editSchedule: {
            const newTimetable = state.timetable.map((item, index)=>{
                if (index===state.changingCell[0]) {
                    let newClassroom: types.Classroom = {'09-00': [],
                    '10-00': [],
                    '11-00': [],
                    "12-00": [],
                    "13-00": [],
                    "14-00": [],
                    "15-00": [],
                    "16-00": [],
                    "17-00": [],
                    "18-00": []};
                    var prop: types.Keys 
                    for (prop in item) {
                        if (prop===state.changingCell[1]) {
                            const newLessons=item[prop].map((elem: types.Lesson|{}, ind: number)=>{
                                if (ind===state.changingCell[2]) return action.payload
                                else return elem
                            });
                            newClassroom[prop] = newLessons
                        } else newClassroom[prop] = item[prop]
                    } return newClassroom
                } else return item
            });
            
            return {...state, timetable: newTimetable} 
        }
    }
    return state
}

export default scheduleReducer