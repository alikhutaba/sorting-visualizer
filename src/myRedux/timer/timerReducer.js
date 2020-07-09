import {SET_TIMER} from './timerAction'


const initialState = {
    timer : "stop",
}

const timerReducer = (state=initialState, action) => {

    switch(action.type){
        case SET_TIMER:
        return{
            timer : action.payload
        } 
        default:
            return state;
    }
}

export default timerReducer;