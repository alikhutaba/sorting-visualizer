
import React from 'react'
import { connect } from "react-redux";
import './Title.css'


class Title extends React.Component {

  render() {

    const {algorithm} = this.props

    let algorithmTitle = algorithm
    algorithmTitle = algorithm === "" ?
      algorithmTitle = "choose a sorting algorithm" : 
      algorithmTitle = (algorithm).charAt(0).toUpperCase() + algorithm.slice(1).replace("Sort"," Sort")
   
    return(
        <div className="sortTitle"><h4 className="title">{algorithmTitle}</h4></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Title);
