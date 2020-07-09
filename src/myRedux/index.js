import {combineReducers} from 'redux'
import algorithmReducer from './algorithm/algorithmReducer'
import arrayReducer from './array/arrayReducer'
import isSortingReducer from './isSorting/isSortingReducer'
import swapReducer from './swap/swapReducer'
import pivotReducer from './pivot/pivotReducer'
import sortedReducer from './sorted/sortedReducer'
import sizeReducer from './arraySize/arraySizeReducer'
import timerReducer from './timer/timerReducer'



export {setAlgorithm} from './algorithm/algorithmAction'
export {setArray} from './array/arrayAction'
export {setIsSorting} from './isSorting/isSortingAction'
export {setSwap} from './swap/swapAction'
export {setPivot} from './pivot/pivotAction'
export {setSorted} from './sorted/sortedAction'
export {setSize} from './arraySize/arraySizeAction'
export {setTimer} from './timer/timerAction'


const allReduces = combineReducers({
    
    arrayReducer,
    algorithmReducer,
    isSortingReducer,
    swapReducer,
    pivotReducer,
    sortedReducer,
    sizeReducer,
    timerReducer

});

export default allReduces;