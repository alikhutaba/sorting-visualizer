import React from 'react'
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import './Toolbar.css'

import bubbleSort from '../../algorithms/bubbleSort.js';
import mergeSort from '../../algorithms/mergeSort.js';
import quickSort from '../../algorithms/quickSort';
import selectionSort from '../../algorithms/selectionSort';
import insertionSort from '../../algorithms/insertionSort';
import heapSort from '../../algorithms/heapSort';

import {setAlgorithm, setArray, setIsSorting, setSize, setTimer} from '../../myRedux'


const BUBBLE_SORT = 'bubbleSort'
const MERGE_SORT = 'mergeSort';
const QUICK_SORT = 'quickSort'
const HEAP_SORT = 'heapSort'
const INSERTION_SORT = 'insertionSort'
const SELECTION_SORT = 'selectionSort'

const SMALL_ARRAY_SIZE = "SMALL_ARRAY_SIZE"
const BIG_ARRAY_SIZE = "BIG_ARRAY_SIZE"


class Toolbar extends React.Component{

    constructor(props){

        super(props);
        this.resetSortingArray = this.resetSortingArray.bind(this);
        this.changeSize = this.changeSize.bind(this);
    }


    componentDidMount(){
        this.resetSortingArray(this.props.size);
    }


    changeSize(size){
        var newSize = size === SMALL_ARRAY_SIZE ? BIG_ARRAY_SIZE : SMALL_ARRAY_SIZE
        this.props.setSize(newSize)
        this.resetSortingArray(newSize)
    }


    resetSortingArray(size){
        const sortingArray = []
        var len = size === SMALL_ARRAY_SIZE? 120 : 75
        for(let i=0 ; i < len; i++)
            sortingArray.push(randomNumber(10,680))
        this.props.setArray(sortingArray)
        this.props.setTimer("reset")
    }

    
    render(){
    
        const{array, algorithm, isSorting, sort, size} = this.props
        const sortButton = !isSorting ? "Sort" : ""
        
        return(
            
            <footer className='main'>

                <button onClick={!isSorting ? ()=>this.resetSortingArray(size) : null} type="button" className="main-btn btn btn-outline-primary">Random Array</button>
                
                <button onClick={!isSorting ? ()=>this.props.setAlgorithm(SELECTION_SORT) : null} type="button" className="main-btn btn btn-outline-success">Selection Sort</button>
                <button onClick={!isSorting ? ()=>this.props.setAlgorithm(INSERTION_SORT) : null} type="button" className="main-btn btn btn-outline-info">Insertion Sort</button>
                <button onClick={!isSorting ? ()=>this.props.setAlgorithm(MERGE_SORT) : null} type="button" className="main-btn btn btn-outline-warning">Merge Sort</button>

                <button onClick={!isSorting ? () => sort(array, algorithm) : null} style={isSorting ? {backgroundColor: "#dc3545" , cursor: "not-allowed"} : null} type="button" className="main-btn btn btn-outline-danger btn-circle btn-lg">{sortButton}</button>

                <button onClick={!isSorting ? ()=>this.props.setAlgorithm(QUICK_SORT) : null} type="button" className="main-btn btn btn-outline-warning">Quick Sort</button>
                <button onClick={!isSorting ? ()=>this.props.setAlgorithm(HEAP_SORT) : null} type="button" className="main-btn btn btn-outline-info">Heap Sort</button>
                <button onClick={!isSorting ? ()=>this.props.setAlgorithm(BUBBLE_SORT) : null} type="button" className="main-btn btn btn-outline-success">Bubble Sort</button>
            
                <button onClick={!isSorting ? ()=>this.changeSize(size) : null} type="button" className="main-btn btn btn-outline-primary">Change Size</button>

            </footer>
        )
    }



}


function randomNumber(min, max){
    return Math.floor(Math.random() * max) + min  
}

const mapStateToProps = state =>{
    return {
        array : state.arrayReducer.array,
        algorithm : state.algorithmReducer.algorithm,
        isSorting : state.isSortingReducer.isSortingBool,
        swap : state.swapReducer.swap,
        sorted  :state.sortedReducer.sorted,
        size : state.sizeReducer.size,
        timer : state.timerReducer.timer,
    }
}

const mapDispatchToProps = dispatch => {
    
    return{
        setAlgorithm: algorithmName => dispatch(setAlgorithm(algorithmName)),
        setArray: array => dispatch(setArray(array)),
        setIsSorting : setIsSortingBool => dispatch(setIsSorting(setIsSortingBool)),
        setSize : size => dispatch(setSize(size)),
        setTimer : timer => dispatch(setTimer(timer)),

        sort :(array, algorithm)=>{
           
            if(algorithm === BUBBLE_SORT)
                bubbleSort(array,dispatch)

            if(algorithm === MERGE_SORT)
                mergeSort(array, dispatch)

            if(algorithm === QUICK_SORT)
                quickSort(array, dispatch)
            
            if(algorithm === SELECTION_SORT)
                selectionSort(array,dispatch)
            
            if(algorithm === INSERTION_SORT)
                insertionSort(array,dispatch)

            if(algorithm === HEAP_SORT)
                heapSort(array,dispatch)
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);