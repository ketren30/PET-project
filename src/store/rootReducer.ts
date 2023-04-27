import { combineReducers } from 'redux';
import logReducer from './logReducer';
import scheduleReducer from './scheduleRedducer';
import newsReducer from './newsReducer';
import versionReducer from './versionReducer';
type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
    logging: logReducer,
    schedule: scheduleReducer,
    news: newsReducer,
    version: versionReducer
})

export default rootReducer