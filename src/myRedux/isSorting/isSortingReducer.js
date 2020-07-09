import {SET_IS_SORTING} from './isSortingAction'


const initialState = {
    isSortingBool : false,
}

const isSortingReducer = (state=initialState, action) => {

    switch(action.type){
        case SET_IS_SORTING:
        return{
            ...state,
            isSortingBool : action.payload
        } 
        default:
            return state;
    }
}

export default isSortingReducer;