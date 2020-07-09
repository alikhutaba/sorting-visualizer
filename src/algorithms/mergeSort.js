
import { setTimer, setSorted, setIsSorting, setSwap} from "../myRedux";


function mergeSort(originalArray, dispatch) {

  let animation = []
  let sorted = []
  let sortedArray = originalArray.slice()
  let array = originalArray.slice()

  dispatch(setIsSorting(true))
  dispatch(setTimer("start"))
  
  mergeSortImplementation(array, sortedArray, animation, 0, originalArray.length - 1);
 
  dispatchChanges(animation, dispatch, sorted)

}


function mergeSortImplementation(originalArray, sortedArray, animation, left, right) {

  if (left === right) 
    return;

  let middle = Math.floor((left + right) / 2);
  let lastMerge = false

  mergeSortImplementation(sortedArray, originalArray, animation, left, middle);
  mergeSortImplementation(sortedArray, originalArray, animation, middle + 1, right);
  if(left === 0 && right === originalArray.length-1)
    lastMerge = true
  merge(originalArray, sortedArray, animation, lastMerge, left, middle, right);

}


function merge(originalArray, sortedArray, animation, lastMerge, left, middle, right) {

  let i = left;
  let j = middle + 1;
  let originalIndex = left;

  while (i <= middle && j <= right) {

    if (sortedArray[i] <= sortedArray[j]) {
      
      animation.push(["swap", originalIndex, sortedArray[i], originalIndex, sortedArray[i] ])
      animation.push(["swapped", originalIndex, sortedArray[i], originalIndex, sortedArray[i] ])
      originalArray[originalIndex++] = sortedArray[i++]
    
    } else {
      
      animation.push(["swap", originalIndex, sortedArray[j], originalIndex, sortedArray[j] ])
      animation.push(["swapped", originalIndex, sortedArray[j], originalIndex, sortedArray[j] ])
      originalArray[originalIndex++] = sortedArray[j++]
    }
    if(lastMerge)
      animation.push(["sorted", originalIndex-1,])

  }

  while (i <= middle) {

    animation.push(["swap", originalIndex, sortedArray[i], originalIndex, sortedArray[i] ])
    animation.push(["swapped", originalIndex, sortedArray[i], originalIndex, sortedArray[i] ])
    originalArray[originalIndex++] = sortedArray[i++];
    if(lastMerge)
      animation.push(["sorted", originalIndex-1,])

  }

  while (j <= right) {

    animation.push(["swap", originalIndex, sortedArray[j], originalIndex, sortedArray[j] ])
    animation.push(["swapped", originalIndex, sortedArray[j], originalIndex, sortedArray[j] ])
    originalArray[originalIndex++] = sortedArray[j++];
    if(lastMerge)
      animation.push(["sorted", originalIndex-1,])
  }

  if(lastMerge)
  animation.push(["sorted", originalIndex,])

}



function dispatchChanges(animation, dispatch, sorted){

  if(!animation.length){
    dispatch(setSwap([]))
    dispatch(setTimer("stop"))

    setTimeout(() => {
      dispatch(setSorted([]))
      dispatch(setIsSorting(false))

    }, 1000);

    return
  }

  if(animation[0][0] === "sorted"){
    sorted.push(animation[0][1])
    dispatch(setSorted(sorted))
  }
  
  if(animation[0][0] === "swap" || animation[0][0] === "add")
    dispatch(setSwap(animation[0]))

  setTimeout(() => {
    animation.shift()
    dispatchChanges(animation, dispatch, sorted)
  }, 1);
  

}


export default mergeSort;
