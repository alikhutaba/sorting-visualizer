import {SET_SWAP} from './swapAction'


const initialState = {
    swap : [],
}

const swapReducer = (state=initialState, action) => {

    switch(action.type){
        case SET_SWAP:
        return{
            swap : action.payload
        } 
        default:
            return state;
    }
}

export default swapReducer;