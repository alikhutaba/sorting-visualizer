import React from 'react'
import { connect } from "react-redux";

import './Information.css'



const BUBBLE_SORT = 'bubbleSort'
const MERGE_SORT = 'mergeSort';
const QUICK_SORT = 'quickSort'
const HEAP_SORT = 'heapSort'
const INSERTION_SORT = 'insertionSort'
const SELECTION_SORT = 'selectionSort'

class Information extends React.Component{

    render(){

      const algorithm = this.props.algorithm === QUICK_SORT ?
       quickSort : this.props.algorithm === BUBBLE_SORT ?
       bubbleSort: this.props.algorithm === MERGE_SORT ?
       mergeSort : this.props.algorithm === HEAP_SORT?
       heapSort  : this.props.algorithm === INSERTION_SORT?
       insertionSort : this.props.algorithm === SELECTION_SORT?
       selectionSort : defaultInfo

        return(
            <div className="info">

              <div className="pseuoCode">{algorithm.pseudo}</div>
           
                <table style= {algorithm === defaultInfo ? {display: "none"} : null}>
                  <thead>
                    <tr>
                      <th>Best</th>
                      <th>Average</th>
                      <th>Worst</th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <td>{algorithm.time[0]}</td>
                      <td>{algorithm.time[1]}</td>
                      <td>{algorithm.time[2]}</td>
                    </tr>
                  </thead>
                </table>
              
            </div>
        )
    }


}
const mapStateToProps = state =>{
    return {
        algorithm : state.algorithmReducer.algorithm,
    }
}
const mapDispatchToProps = dispatch => {
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Information);



var defaultInfo={

  "pseudo" : null,
  "time" : [null,null,null]
}

const nlognPic = <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/560dfdce0353a330e03e4b3e0b7ca6e484bb40fb"  aria-hidden="true"  alt="n\log n"></img>
const n2Pic = <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/ac9810bbdafe4a6a8061338db0f74e25b7952620"  aria-hidden="true"  alt="n^{2}"></img>
const nPicn = <span className="nPic" style={{fontstyle: 'italic'}}>n</span>


const selectionSort = {

  "pseudo" :<pre>{`
  
selectionsort(A):
  n := length(A)
  for i = 1 to n - 1
    min = i    
    for j = i+1 to n 
      if A[j] < A[min]:
         min = j;
      end if
    end for
    if indexMin != i:
      swap A[min] with A[i]
    end if
  end for
end selectionsort
  
  `}</pre>

  ,"time" : [n2Pic, n2Pic, n2Pic]

}



const insertionSort={

  "pseudo" :<pre>{`
  
insertionSort(A):
  for i=1 to n
   j = i 
   while j>= 0 & A[j-1]>A[j]
      temp = A[j-1]
      A[j - 1] = A[j]
      A[j] = temp
      j--
    end while
  end for
end insertionSort
    `}</pre>
  
    ,"time" : [nPicn ,n2Pic , n2Pic]

}


const mergeSort = {

  "pseudo" :<pre>{`
mergesort(array) :
  if n == 1 :
    return a
  l1 = mergesort(a[0]..a[n/2])
  l2 = mergesort(a[n/2+1]..a[n])
  return merge( l1, l2 )

merge(a, b) :
  var c as array
  while a and b have elements :
     if a[0] > b[0] :
        add b[0] to the end of c
        remove b[0] from b
     else
        add a[0] to the end of c
        remove a[0] from a

  while a has elements :
     add a[0] to the end of c
     remove a[0] from a
     
  while b has elements :
     add b[0] to the end of c
     remove b[0] from b
  return c
  `}</pre>

  ,"time" : [nlognPic, nlognPic ,nlognPic]

}


const quickSort={

  "pseudo" : <pre>{`
  
quicksort(A, lo, hi):
  if lo < hi :
   p := partition(A, lo, hi)
   quicksort(A, lo, p - 1)
   quicksort(A, p + 1, hi)
  end if
end quicksort

partition(A, lo, hi):
 pivot := A[hi]
 i := lo
 for j := lo to hi :
   if A[j] < pivot then
     swap A[i] with A[j]
     i := i + 1
    end if
  end for
  swap A[i] with A[hi]
  return i
end partition
              
`}</pre>
  
  ,"time" : [nlognPic, nlognPic, n2Pic]

}


const heapSort={

  "pseudo" :<pre>{`
Heapsort(A):
  n := length(A)
  BuildHeap(A, n)
  for i = n to 0 :
    swap A[0] with A[i]
    n = n - 1
    Heapify(A, i, 0)

BuildHeap(A, n):
  for i := floor(n/2) to 1 :
    Heapify(A, n, i)

Heapify(A, n, i):
  left = 2i + 1
  right = 2i + 2
  if left<n & A[left]>A[i] :
      max = left
  else 
      max = i
  if right<n & A[right]>A[max]:
      max = right
  if max != i :
      swap A[i] with A[max]
      Heapify(A, n, max)
    `}</pre>
  
    ,"time" : [nPicn ,n2Pic , n2Pic]

}



const bubbleSort = {

  "pseudo" : <pre>{`
  
bubbleSort(A):
  n := length(A)
  repeat
    swapped := false
    for i:=1 to n-1 :
      if A[i-1] > A[i] :
        swap A[i-1] with A[i]
        swapped = true
      end if
    end for
  n := n - 1
  until not swapped
end bubbleSort
  
  `}</pre>

  ,"time" : [nPicn ,n2Pic , n2Pic]

}
































