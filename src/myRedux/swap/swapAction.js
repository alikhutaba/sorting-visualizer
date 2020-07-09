
export const SET_SWAP = 'SET_SWAP';

export const setSwap = (swap=[]) =>{
    return {
        type: SET_SWAP,
        payload: swap
    }
}