import {SET_ALGORITHM} from './algorithmAction'

const initialState = {
    algorithm : "",
}


const algorithmReducer = (state=initialState, action) => {

    switch(action.type){
        case SET_ALGORITHM:
        return{
            ...state,
            algorithm : action.payload
        } 
        default:
            return state;
    }
}

export default algorithmReducer;