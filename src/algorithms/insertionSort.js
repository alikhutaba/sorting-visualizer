import { setSwap, setTimer, setSorted, setIsSorting} from "../myRedux";


function insertionSort(originalArray, dispatch){

    let animation = []
    let sorted = []
    let sortedArray = originalArray.slice()

    dispatch(setIsSorting(true))
    dispatch(setTimer("start"))

    insertionSortImplementation(sortedArray, animation)

    dispatchChanges(animation, dispatch, sorted)



}


function insertionSortImplementation(nums, animation){

    var t
    for (let i = 1; i < nums.length; i++) {
        let j = i 
        while (j >= 0 && nums[j-1] > nums[j]) {
            animation.push(["swap", j-1, nums[j], j, nums[j-1]])
            animation.push(["swap", j-1, nums[j], j, nums[j-1]])
            animation.push(["swapped", j-1, nums[j], j, nums[j-1]])
        
            t = nums[j-1]
            nums[j - 1] = nums[j]
            nums[j] = t
            j--
        }
      }
    
    for(let i=0 ; i < nums.length ; i++)
        animation.push(['sorted', i])
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
        setTimeout(() => {
            dispatch(setSorted(sorted))
          }, 100);
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

  export default insertionSort;