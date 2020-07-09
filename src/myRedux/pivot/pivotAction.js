
export const SET_PIVOT = 'SET_PIVOT';

export const setPivot = (pivot=[]) =>{
    return {
        type: SET_PIVOT,
        payload: pivot
    }
}