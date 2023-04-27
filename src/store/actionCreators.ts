import * as actionTypes from './actionTypes';
import * as types from '../type';
import {Dispatch} from 'redux';

export const CheckUser = (user: types.PotUser) => {
    const action: types.MainAction = {
        type: actionTypes.checkUser,
        payload: user
    }
    return action
}

export const LogOut = () => {
    const action: types.MainAction = {
        type: actionTypes.logOut
    }
    return action
}

export const ShowLoading = () => {
    const action: types.MainAction = {
        type: actionTypes.showLoading
    }
    return action
}

export const HideLoading = () => {
    const action: types.MainAction = {
        type: actionTypes.hideLoading
    }
    return action
}

export const ShowAlert = (alert: string) => {
    const action: types.MainAction = {
        type: actionTypes.showAlert,
        payload: alert
    }
    return action
}

export function FetchSchedule () {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(ShowLoading());

        const url = 'https://api.jsonbin.io/v3/b/6400a25face6f33a22e826d4';
        
        const action = await (await fetch(url)).json();

        dispatch({
            type: actionTypes.fetchSchedule,
            payload: action.record,
        });

        dispatch(HideLoading());

    }
}

    
export const ShowModal = () => {
    const action: types.MainAction = {
        type: actionTypes.showModal
    }
    return action
}
export const HideModal = () => {
    const action: types.MainAction = {
        type: actionTypes.hideModal
    }
    return action
}
export const changeVisibility = () => {
    const action: types.MainAction = {
        type: actionTypes.changeVisibility
    }
    return action
}

export const ChooseCell = (indexes: types.changingCell) => {
    const action: types.MainAction = {
        type: actionTypes.chooseCell,
        payload: indexes
    }
    return action
}

export const EditSchedule = (lesson: types.Lesson) => {
    const action: types.MainAction = {
        type: actionTypes.editSchedule,
        payload: lesson
    }
    return action
}
export const DeleteLesson = () => {
    const action: types.MainAction = {
        type: actionTypes.deleteLesson
    }
    return action
}



export function FetchNews () {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(ShowLoading());

        const url = 'https://api.jsonbin.io/v3/b/63ff2b48ebd26539d0875ca1';
        
        const action = await (await fetch(url)).json();
        
        dispatch({
            type: actionTypes.fetchNews,
            payload: action.record,
        });

        setTimeout(()=>dispatch(HideLoading()), 1500);

    }
}

export const AddNews = (news: types.News) => {
    const action: types.MainAction = {
        type: actionTypes.addNews,
        payload: news
    }
    return action
}

export const DeleteNews = (index: number) => {
    const action: types.MainAction = {
        type: actionTypes.deleteNews,
        payload: index
    }
    return action
}

export const ChangeVersion = (bool: boolean) => {
    const action: types.MainAction = {
        type: actionTypes.changeVersion,
        payload: bool
    }
    return action
}
export const ChangeWidth = (width: number) => {
    const action: types.MainAction = {
        type: actionTypes.changeWidth,
        payload: width
    }
    return action
}