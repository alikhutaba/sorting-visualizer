import {SET_PIVOT} from './pivotAction'


const initialState = {
    pivot : [],
}

const pivotReducer = (state=initialState, action) => {

    switch(action.type){
        case SET_PIVOT:
        return{
            pivot : action.payload
        } 
        default:
            return state;
    }
}

export default pivotReducer;