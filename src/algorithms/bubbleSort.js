import { setSwap, setTimer, setSorted, setIsSorting } from "../myRedux";



function bubbleSort(originalArray, dispatch){

    let animation = []
    let sorted = []
    let array = originalArray.slice()

    dispatch(setIsSorting(true))
    dispatch(setTimer("start"))

    bubbleSortImplementation(array, animation)

    dispatchChanges(animation, dispatch, sorted)
}


function bubbleSortImplementation(arr, animation){

    var swapp;
    var len = arr.length-1;
    var temp

    do {
        swapp = false;

        for (let i=0; i < len; i++){

            animation.push(["compare", i, i+1])
            animation.push(["compared", i, i+1])

            if (arr[i] > arr[i+1]){

                animation.push(["swap", i, arr[i+1], i+1, arr[i]])
                animation.push(["swap", i, arr[i+1], i+1, arr[i]])
                animation.push(["swapped", i, arr[i+1], i+1, arr[i]])

               temp = arr[i];
               arr[i] = arr[i+1];
               arr[i+1] = temp;
               swapp = true;
            }
        }
        animation.push(["sorted", len,])
        len--;

    } while (swapp);

    for(len ; len>=0 ; len--)
        animation.push(["sorted", len,])
    
    animation.push(["compared", []])
    animation.push(["swap", []])

}



function dispatchChanges(animation, dispatch, sorted){

    if(!animation.length){
        dispatch(setSorted(sorted))
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

    if(animation[0][0] === "swap" || animation[0][0] === "swapped")
      dispatch(setSwap(animation[0]))
    
    if(animation[0][0] === "compare" || animation[0][0] === "compared")
        dispatch(setSwap(animation[0]))
  
    setTimeout(() => {
      animation.shift()
      dispatchChanges(animation, dispatch, sorted)
    }, 1);
    
  
  }



export default bubbleSort;