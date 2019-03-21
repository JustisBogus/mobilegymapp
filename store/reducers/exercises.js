import { ADD_USER, ADD_WORKOUTS } from '../actions/actionTypes';

const initialState = {
        name:'',
        gender:'',
        email:'',
        user:'',
        loggedInUser:'',  
        workouts: [ ],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                loggedInUser: action.email,
            };
        case ADD_WORKOUTS: 
            return {
                ...state,
                workouts: [action.workouts].concat(state.workouts), 
            }; 
        default:
            return state;
    }
};

export default reducer;

