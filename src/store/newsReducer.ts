import { MainAction, NewsState } from "../type";
import * as actionTypes from "./actionTypes";

const initialState: NewsState = {
    news: [],
    loading: false,
    isVisible: false
}

const newsReducer = (
    state: NewsState = initialState,
    action: MainAction
):NewsState => {
    switch (action.type) {
        case actionTypes.fetchNews: 
            return {...state, news: action.payload}
        case actionTypes.changeVisibility:
            return {...state, isVisible: !state.isVisible}
        case actionTypes.showLoading:
            return {...state, loading: true}
        case actionTypes.hideLoading:
            return {...state, loading: false}
        case actionTypes.addNews:
            const news1 = state.news.concat(action.payload)
            return {...state, news: news1}
    }
    return state
}

export default newsReducer