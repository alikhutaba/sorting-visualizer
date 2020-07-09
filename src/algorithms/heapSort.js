import { setSwap, setTimer, setSorted, setIsSorting} from "../myRedux";


function heapSort(originalArray, dispatch){

    let animation = []
    let sorted = []
    let sortedArray = originalArray.slice()

    dispatch(setIsSorting(true))
    dispatch(setTimer("start"))

    heapSortImplementation(sortedArray, animation)

    dispatchChanges(animation, dispatch, sorted)
}


function heapSortImplementation(array, animation) {
    let size = array.length
  
    // build heapSort (rearrange array)
    for (let i = Math.floor(size / 2 - 1); i >= 0; i--)
      heapify(array, size, i, animation)
  
    // one by one extract an element from heapSort
    for (let i = size - 1; i >= 0; i--) {

        animation.push(["swap", 0, array[i], i, array[0]])
        animation.push(["swap", 0, array[i], i, array[0]])
        animation.push(["swapped", 0, array[i], i, array[0]])
    
        // move current root to end
        let temp = array[0]
        array[0] = array[i]
        array[i] = temp

        animation.push(['sorted', i])
        // call max heapify on the reduced heapSort
        heapify(array, i, 0, animation)
    }
  }
  
  // to heapify a subtree rooted with node i which is an index in array[]
  function heapify(array, size, i, animation) {
    let max = i // initialize max as root
    let left = 2 * i + 1
    let right = 2 * i + 2
  
    // if left child is larger than root

    if (left < size && array[left] > array[max])
      max = left
  
    // if right child is larger than max
    if (right < size && array[right] > array[max])
      max = right
  
    // if max is not root
    if (max !== i) {

        animation.push(["swap", i, array[max], max, array[i]])
        animation.push(["swap", i, array[max], max, array[i]])
        animation.push(["swapped", i, array[max], max, array[i]])
      // swap
      let temp = array[i]
      array[i] = array[max]
      array[max] = temp
  
      // recursively heapify the affected sub-tree
      heapify(array, size, max ,animation)
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

export default heapSort;