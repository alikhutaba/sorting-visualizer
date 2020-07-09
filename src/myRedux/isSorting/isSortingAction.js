
export const SET_IS_SORTING = 'SET_IS_SORTING';

export const setIsSorting = (isSortingBool=false) =>{
    return {
        type: SET_IS_SORTING,
        payload: isSortingBool
    }
}