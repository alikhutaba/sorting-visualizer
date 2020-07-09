
export const SET_ALGORITHM = 'SET_ALGORITHM';

export const setAlgorithm = (algorithmName) =>{
    return {
        type: SET_ALGORITHM,
        payload: algorithmName
    }
}