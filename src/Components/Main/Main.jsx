import React from "react";
import Board from "../Board/Board";
import Toolbar from "../Toolbar/Toolbar";
import Title from "../Title/Title";

import "./Main.css";

class Main extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <Title></Title>
        <Board></Board>
        <Toolbar></Toolbar>
      </div>
    );
  }
}

export default Main;
