import {SET_SORTED} from './sortedAction'


const initialState = {
    sorted : [],
}

const sortedReducer = (state=initialState, action) => {

    switch(action.type){
        case SET_SORTED:
        return{
            ...state,
            sorted : action.payload
        } 
        default:
            return state;
    }
}

export default sortedReducer;