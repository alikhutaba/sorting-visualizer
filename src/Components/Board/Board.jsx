import React from "react";
import { connect } from "react-redux";
import Timer from "../Timer/Timer";
import Information from "../Information/Information";

import "./Board.css";

import { setArray } from "../../myRedux";

const BIG_ARRAY_SIZE = "BIG_ARRAY_SIZE";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.linesStyle = this.linesStyle.bind(this);
  }

  linesStyle(value, index) {
    const swap = this.props.swap;
    const pivot = this.props.pivot;
    const sorted = this.props.sorted;
    const tempArr = this.props.array;

    if (sorted.includes(index))
      return { height: `${value}px`, backgroundColor: "#61dafb" };

    if (swap[0] === "swap" && (index === swap[1] || index === swap[3])) {
      if (tempArr[swap[1]] !== swap[2] || tempArr[swap[3]] !== swap[4]) {
        tempArr[swap[1]] = swap[2];
        tempArr[swap[3]] = swap[4];
        setArray(tempArr);
      }
      return { height: `${value}px`, backgroundColor: "#dc3545" };
    }

    if (swap[0] === "swapped" && (index === swap[1] || index === swap[2]))
      return { height: `${value}px`, backgroundColor: "royalblue" };

    if (swap[0] === "compare" && (index === swap[1] || index === swap[2]))
      return { height: `${value}px`, backgroundColor: "#008000" };

    if (swap[0] === "compared" && (index === swap[1] || index === swap[2]))
      return { height: `${value}px`, backgroundColor: "royalblue" };

    if (pivot[0] === "pivot" && index === pivot[1])
      return { height: `${value}px`, backgroundColor: "#000000" };

    return { height: `${value}px` };
  }

  render() {
    const { array, size } = this.props;

    return (
      <section className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <Timer></Timer>
          </div>

          <dir id="board" className="col-sm-8">
            {array.map((value, indx) => (
              <div
                className={
                  size === BIG_ARRAY_SIZE ? "big-array-bar" : "small-array-bar"
                }
                key={indx}
                style={this.linesStyle(value, indx)}
              ></div>
            ))}
          </dir>

          <div className="col-sm-2">
            <Information></Information>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    array: state.arrayReducer.array,
    algorithm: state.algorithmReducer.algorithm,
    swap: state.swapReducer.swap,
    pivot: state.pivotReducer.pivot,
    sorted: state.sortedReducer.sorted,
    size: state.sizeReducer.size,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setArray: (array) => dispatch(setArray(array)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
