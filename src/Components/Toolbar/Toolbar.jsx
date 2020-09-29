import React from "react";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.css";
import "./Toolbar.css";

import bubbleSort from "../../algorithms/bubbleSort.js";
import mergeSort from "../../algorithms/mergeSort.js";
import quickSort from "../../algorithms/quickSort";
import selectionSort from "../../algorithms/selectionSort";
import insertionSort from "../../algorithms/insertionSort";
import heapSort from "../../algorithms/heapSort";

import {
  setAlgorithm,
  setArray,
  setIsSorting,
  setSize,
  setTimer,
} from "../../myRedux";

const BUBBLE_SORT = "bubbleSort";
const MERGE_SORT = "mergeSort";
const QUICK_SORT = "quickSort";
const HEAP_SORT = "heapSort";
const INSERTION_SORT = "insertionSort";
const SELECTION_SORT = "selectionSort";

const SMALL_ARRAY_SIZE = "SMALL_ARRAY_SIZE";
const BIG_ARRAY_SIZE = "BIG_ARRAY_SIZE";

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, isClose: true };
    this.resetSortingArray = this.resetSortingArray.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    this.resetSortingArray(this.props.size);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    // var width = document.getElementById("board").getBoundingClientRect().width;
    // var height = document.getElementById("board").getBoundingClientRect()
    //   .height;
    // this.setState({ width: width, height: height });

    this.setState({ width: window.innerWidth, height: window.innerHeight });
    if (!this.props.isSorting) this.resetSortingArray(this.props.size);
  }

  resetSortingArray(size) {
    const sortingArray = [];
    var len =
      size === SMALL_ARRAY_SIZE
        ? Math.floor(window.innerWidth / 16)
        : Math.floor(window.innerWidth / 26);

    for (let i = 0; i < len; i++)
      sortingArray.push(randomNumber(10, window.innerHeight / 1.4));
    this.props.setArray(sortingArray);
    this.props.setTimer("reset");
  }

  changeSize(size) {
    var newSize = size === SMALL_ARRAY_SIZE ? BIG_ARRAY_SIZE : SMALL_ARRAY_SIZE;
    this.props.setSize(newSize);
    this.resetSortingArray(newSize);
  }

  toggleHamburgerIconClass = (e) => {
    this.setState({ isClose: !this.state.isClose });
    // if (window.innerWidth < 850 && this.state.isClose)
    //   document.getElementById("menu").style.height = "450px";
    // if (window.innerWidth < 850 && !this.state.isClose)
    //   document.getElementById("menu").style.height = "0px";
  };

  render() {
    const { array, algorithm, isSorting, sort, size } = this.props;
    const sortButton = !isSorting ? "Sort" : "";

    return (
      <footer className="main">
        <div className="hamburger-menu">
          <div
            id="hamburger-icon"
            className={this.state.isClose ? "" : "open"}
            onClick={this.toggleHamburgerIconClass}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <button
          onClick={!isSorting ? () => sort(array, algorithm) : null}
          style={
            isSorting
              ? { backgroundColor: " #61dafb", cursor: "not-allowed" }
              : null
          }
          type="button"
          className="main-btn btn btn-outline-info  sort-mobile-button"
        >
          {sortButton}
        </button>

        <div
          id="menu"
          className={this.state.isClose ? "" : "op"}
          // style={this.state.isClose ? { height: "0px" } : { height: "450px" }}
        >
          <button
            onClick={!isSorting ? () => this.resetSortingArray(size) : null}
            type="button"
            className=" btn btn-outline-primary main-btn"
          >
            Random Array
          </button>

          <button
            onClick={
              !isSorting ? () => this.props.setAlgorithm(SELECTION_SORT) : null
            }
            type="button"
            className=" btn btn-outline-success main-btn"
          >
            Selection Sort
          </button>
          <button
            onClick={
              !isSorting ? () => this.props.setAlgorithm(INSERTION_SORT) : null
            }
            type="button"
            className=" btn btn-outline-info main-btn"
          >
            Insertion Sort
          </button>
          <button
            onClick={
              !isSorting ? () => this.props.setAlgorithm(MERGE_SORT) : null
            }
            type="button"
            className=" btn btn-outline-warning main-btn"
          >
            Merge Sort
          </button>

          <button
            onClick={!isSorting ? () => sort(array, algorithm) : null}
            style={
              isSorting
                ? { backgroundColor: "#dc3545", cursor: "not-allowed" }
                : null
            }
            type="button"
            className="main-btn btn btn-outline-danger btn-circle btn-lg"
            id="sort-button"
          >
            {sortButton}
          </button>

          <button
            onClick={
              !isSorting ? () => this.props.setAlgorithm(QUICK_SORT) : null
            }
            type="button"
            className=" btn btn-outline-warning main-btn"
          >
            Quick Sort
          </button>
          <button
            onClick={
              !isSorting ? () => this.props.setAlgorithm(HEAP_SORT) : null
            }
            type="button"
            className=" btn btn-outline-info main-btn"
          >
            Heap Sort
          </button>
          <button
            onClick={
              !isSorting ? () => this.props.setAlgorithm(BUBBLE_SORT) : null
            }
            type="button"
            className=" btn btn-outline-success main-btn"
          >
            Bubble Sort
          </button>

          <button
            onClick={!isSorting ? () => this.changeSize(size) : null}
            type="button"
            className=" btn btn-outline-primary main-btn"
          >
            Change Size
          </button>
        </div>
      </footer>
    );
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

const mapStateToProps = (state) => {
  return {
    array: state.arrayReducer.array,
    algorithm: state.algorithmReducer.algorithm,
    isSorting: state.isSortingReducer.isSortingBool,
    swap: state.swapReducer.swap,
    sorted: state.sortedReducer.sorted,
    size: state.sizeReducer.size,
    timer: state.timerReducer.timer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlgorithm: (algorithmName) => dispatch(setAlgorithm(algorithmName)),
    setArray: (array) => dispatch(setArray(array)),
    setIsSorting: (setIsSortingBool) =>
      dispatch(setIsSorting(setIsSortingBool)),
    setSize: (size) => dispatch(setSize(size)),
    setTimer: (timer) => dispatch(setTimer(timer)),

    sort: (array, algorithm) => {
      if (algorithm === BUBBLE_SORT) bubbleSort(array, dispatch);

      if (algorithm === MERGE_SORT) mergeSort(array, dispatch);

      if (algorithm === QUICK_SORT) quickSort(array, dispatch);

      if (algorithm === SELECTION_SORT) selectionSort(array, dispatch);

      if (algorithm === INSERTION_SORT) insertionSort(array, dispatch);

      if (algorithm === HEAP_SORT) heapSort(array, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
