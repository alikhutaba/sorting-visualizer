import {SET_SIZE} from './arraySizeAction'

const initialState = {
    size : "SMALL_ARRAY_SIZE",
}


const sizeReducer = (state=initialState, action) => {

    switch(action.type){
        case SET_SIZE:
        return{
            ...state,
            size : action.payload
        } 
        default:
            return state;
    }
}

export default sizeReducer;