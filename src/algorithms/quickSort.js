import { setSwap, setPivot, setSorted, setIsSorting, setTimer} from "../myRedux";

function quickSort(originalArray, dispatch){

    let animation = []
    let sorted = []
    let sortedArray = originalArray.slice()

    dispatch(setIsSorting(true))
    dispatch(setTimer("start"))

    quickSortImplementation(sortedArray, 0, sortedArray.length-1, animation)    

    dispatchChanges(animation, dispatch, sorted)
}

 function quickSortImplementation(arr, left, right, animation){

    if (left >= right) {
        animation.push(['sorted', left])
        return;
      }

    var pivot = left
    var start = left+1
    var end = right
    
    animation.push(['pivot', pivot])

    while(start <= end){

        animation.push(["compare", start, end])
        animation.push(["compared", start, end])

        if(arr[start] > arr[pivot] && arr[end] < arr[pivot]){
            animation.push(["swap", start, arr[end], end, arr[start] ])
            animation.push(["swap", start, arr[end], end, arr[start] ])
            animation.push(["swapped", start, arr[end], end, arr[start] ])
            swap(arr, start, end);
        }

        if(arr[start] <= arr[pivot])
            start++
        if(arr[end] >= arr[pivot])
            end--

    }
    animation.push(["compare", pivot, end])
    animation.push(["compared", pivot, end])
    if (pivot !== end){
        animation.push(["swap", end, arr[pivot], pivot, arr[end] ])
        animation.push(["swap", end, arr[pivot], pivot, arr[end] ])
        animation.push(["swapped", end, arr[pivot], pivot, arr[end] ])
        swap(arr, end, pivot);
        animation.push(['sorted', end])
    }
    else{
        animation.push(['sorted', pivot])
    }

    quickSortImplementation(arr, left, end - 1, animation);
    quickSortImplementation(arr, end + 1, right, animation);
 }



 function swap(arr, i, j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
 }



function dispatchChanges(animation, dispatch, sorted){

    if(!animation.length){
        dispatch(setSorted(sorted))
        dispatch(setPivot([]))
        dispatch(setTimer("stop"))

      setTimeout(() => {
        dispatch(setSorted([]))
        dispatch(setIsSorting(false))

      }, 2000);
      return
    }

    if(animation[0][0] === "sorted"){
        sorted.push(animation[0][1])
        dispatch(setSorted(sorted))
    }
    if(animation[0][0] === "pivot"){
        dispatch(setPivot(animation[0]))
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



export default quickSort;