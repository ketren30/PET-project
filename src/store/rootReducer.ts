import { combineReducers } from 'redux';
import logReducer from './logReducer';
import scheduleReducer from './scheduleRedducer';
import newsReducer from './newsReducer';
type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
    logging: logReducer,
    schedule: scheduleReducer,
    news: newsReducer
})

export default rootReducer