import { createStore, combineReducers } from 'redux';

import exercisesReducer from './reducers/exercises';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
    exercises: exercisesReducer,
    ui: uiReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;