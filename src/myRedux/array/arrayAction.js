
export const SET_ARRAY = 'SET_ARRAY';

export const setArray = (array=[]) =>{
    return {
        type: SET_ARRAY,
        payload: array
    }
}