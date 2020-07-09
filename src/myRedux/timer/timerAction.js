
export const SET_TIMER = 'SET_TIMER';

export const setTimer = (timer="stop") =>{
    return {
        type: SET_TIMER,
        payload: timer
    }
}