
export const SET_SORTED = 'SET_SORTED';

export const setSorted = (sorted=[]) =>{
    return {
        type: SET_SORTED,
        payload: sorted
    }
}