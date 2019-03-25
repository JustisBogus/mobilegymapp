import { ADD_USER, UPDATE_USER, ADD_WORKOUTS } from './actionTypes';



export const addUser = (email) => {
    return {
        type: ADD_USER,
        email: email,
    };
};

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user: user,
    };
};

export const addWorkouts = (workouts) => {
    return {
        type: ADD_WORKOUTS,
        workouts: workouts,
    };
};