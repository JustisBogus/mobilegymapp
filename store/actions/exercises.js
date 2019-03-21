import { ADD_USER, ADD_WORKOUTS } from './actionTypes';

export const addUser = (email) => {
    return {
        type: ADD_USER,
        email: email,
    };
};

export const addWorkouts = (workouts) => {
    return {
        type: ADD_WORKOUTS,
        workouts: workouts,
    };
};