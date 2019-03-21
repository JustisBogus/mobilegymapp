import { createStore, combineReducers } from 'redux';

import exercisesReducer from './reducers/exercises';

const rootReducer = combineReducers({
    exercises: exercisesReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;