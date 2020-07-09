import { setSwap, setTimer, setSorted, setIsSorting} from "../myRedux";


function selectionSort(originalArray, dispatch){

    let animation = []
    let sorted = []
    let sortedArray = originalArray.slice()

    dispatch(setIsSorting(true))
    dispatch(setTimer("start"))

    selectionSortImplementation(sortedArray, animation)

    dispatchChanges(animation, dispatch, sorted)
}


function selectionSortImplementation(arr, animation){

    var minIdx, temp
    var len = arr.length

    for(var i = 0; i < len; i++){

        minIdx = i

        for(var  j = i+1; j<len; j++){

            animation.push(["compare", j, minIdx])
            animation.push(["compared", j, minIdx])

            if(arr[j]<arr[minIdx]){
                minIdx = j
            }
            
        }
        animation.push(["swap", i, arr[minIdx], minIdx, arr[i]])
        animation.push(["swap", i, arr[minIdx], minIdx, arr[i]])
        animation.push(["swapped", i, arr[minIdx], minIdx, arr[i]])

        temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        animation.push(['sorted', i])
    }

}


function dispatchChanges(animation, dispatch, sorted){

    if(!animation.length){
        dispatch(setSorted(sorted))
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

    if(animation[0][0] === "swap" || animation[0][0] === "swapped")
      dispatch(setSwap(animation[0]))
    
    if(animation[0][0] === "compare" || animation[0][0] === "compared")
        dispatch(setSwap(animation[0]))
  
    setTimeout(() => {
      animation.shift()
      dispatchChanges(animation, dispatch, sorted)
    }, 1);
    
  
  }


export default selectionSort;