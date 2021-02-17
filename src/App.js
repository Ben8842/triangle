import React, { Component } from "react";
import "./App.css";

class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triangle: [],
      specialCount: 2,
    };
  }

  builderOrigin() {
    console.log("hello origin");
    var interval = setInterval(this.countIncrement.bind(this), 250);
    this.setState({ interval: interval });
  }

  countIncrement() {
    var { triangle, specialCount } = this.state;
    this.setState({
      specialCount: this.state.specialCount + 1,
    });
    console.log(specialCount);
    this.forceUpdate();
    if (this.state.specialCount > this.state.viewSize + 1) {
      clearInterval(this.state.interval);
    }
  }

  triangleBuilder() {
    var { triangle } = this.state;
    const viewSize = this.props.sizeValue;
    var triangleRow = [];
    var i = null;
    var u = null;

    triangleRow.push(1);
    triangle.push(triangleRow);

    //triangleRow.push(1);
    //triangle.push(triangleRow);

    function newRowEven(prevRow) {
      var j = 0;
      var newRows = [];
      //newRows.push(1);
      // console.log(newRows.size);

      for (j = 0; j <= prevRow.length; j++) {
        if (j == 0) {
          newRows.push(1);
        } else if (j < prevRow.length && j > 0) {
          newRows.push(prevRow[j] + prevRow[j - 1]);
        } else if ((j = prevRow.length)) {
          newRows.push(prevRow[j - 1]);
        }
      }
      // console.log(newRows);
      return newRows;
    }

    var index = 1;
    while (index < viewSize) {
      console.log(triangle[index - 1]);
      triangle.push(newRowEven(triangle[index - 1]));

      index++;
    }
    console.log(triangle);
  }

  renderSquare(x, y) {
    return <button id="square" codeX={x} codeY={y}></button>;
  }

  renderGreen(x, y, triangleItem) {
    var { triangle } = this.state;
    var width = triangle[y].length;
    if (y % 2 == 0) {
      var dif = Math.floor((this.props.sizeValue + 8 - width) / 2);
    } else var dif = Math.floor((this.props.sizeValue + 8 - width) / 2) - 1;

    if (x > dif - 1) {
      if (triangle[y][x - dif] % 2 == 0) {
        return <button id="squareGreen" codeX={x} codeY={y}></button>;
      } else if (triangle[y][x - dif] % 2 == 1)
        return <button id="squareBlue" codeX={x} codeY={y}></button>;
    } else return <button id="squareEmpty" codeX={x} codeY={y}></button>;
  }

  renderGreenO(x, y, triangleItem) {
    var { triangle } = this.state;
    return <button id="squareGreenO" codeX={x} codeY={y}></button>;
  }

  renderGreenT(x, y, triangle) {
    return <button id="squareGreenT" codeX={x} codeY={y} value="1"></button>;
  }

  render() {
    var { triangle, specialCount } = this.state;
    const elementS = [];
    const elementZ = [];
    const viewSize = this.props.sizeValue;

    console.log(this.triangleBuilder());

    var x;
    var y;

    for (y = 0; y < specialCount; y++) {
      for (x = 0; x < viewSize; x++) {
        if (y % 2 == 0 && x == 0) {
          elementS.push(<span>{this.renderGreenO(x, y, triangle[y][x])}</span>);
        } else
          elementS.push(<span>{this.renderGreen(x, y, triangle[y][x])}</span>);
      }
      elementZ.push(
        <div className="newLine">
          <span>
            {elementS.map((value, index) => {
              return <span key={index}>{value}</span>;
            })}
          </span>
        </div>
      );
      for (x = 0; x < viewSize; x++) {
        elementS.pop();
      }
    }
    return (
      <div className="entireThing">
        <div>
          <button id="greatButton" onClick={() => this.builderOrigin()}>
            BUILD PASCAL/PINSKI TRIANGLE
          </button>
          <span>
            {elementZ.map((value, index) => {
              return <span key={index}>{value}</span>;
            })}
          </span>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 70,
    };
  }
  enterCount() {
    var zvalue = document.getElementById("sizeHere").value;

    this.setState((state) => {
      return { count: zvalue };
    });
  }

  render() {
    var { count } = this.state;

    const inputBox = (
      <div>
        <form>
          <input type="number" class="button" id="sizeHere"></input>
          <button
            type="button"
            class="button"
            onClick={() => this.enterCount()}
          >
            ENTER
          </button>
          10 PRINT CHR$ (205.5 + RND (1)); : GOTO 10
        </form>
      </div>
    );
    return (
      <div>
        <div className="HeaderSpot">{inputBox}</div>
        <Building sizeValue={count} />
      </div>
    );
  }
}

export default App;
