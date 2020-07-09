import {SET_ARRAY} from './arrayAction'


const initialState = {
    array : [],
}

const arrayReducer = (state=initialState, action) => {

    switch(action.type){
        case SET_ARRAY:
        return{
            // ...state,
            array : action.payload
        } 
        default:
            return state;
    }
}

export default arrayReducer;