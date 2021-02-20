import React, { Component } from "react";
import "./App.css";

var firstimg = require("./imgfolder/pascalcalculation.png").default;
var secondimg = require("./imgfolder/squares.png").default;

class Building extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triangle: [],
      specialCount: 2,
      stepz: 0,
    };
  }

  builderOrigin() {
    // console.log("hello origin");
    var interval = setInterval(this.countIncrement.bind(this), 100);
    this.setState({ interval: interval });
  }

  countIncrement() {
    var { triangle, specialCount } = this.state;
    const viewSize = this.props.sizeValue;
    this.setState({
      specialCount: this.state.specialCount + 1,
    });
    //console.log(specialCount);
    this.forceUpdate();
    if (this.state.specialCount > viewSize) {
      clearInterval(this.state.interval);
    }
  }

  displayPascal(x, y, dif) {
    var { triangle } = this.state;
    //console.log(triangle[y][x - dif]);
    console.log("hello");
    console.log(triangle[y][x - dif]);
  }

  triangleBuilder() {
    var { triangle } = this.state;
    console.log(triangle);
    const viewSize = this.props.sizeValue;
    var triangleRow = [];
    var i = null;
    var u = null;

    triangleRow.push(1);
    triangle.push(triangleRow);

    function newRow(prevRow) {
      var j = 0;
      var newRows = [];

      for (j = 0; j <= prevRow.length; j++) {
        if (j == 0) {
          newRows.push(1);
        } else if (j < prevRow.length && j > 0) {
          newRows.push(prevRow[j] + prevRow[j - 1]);
        } else if ((j = prevRow.length)) {
          newRows.push(prevRow[j - 1]);
        }
      }

      return newRows;
    }

    var index = 1;
    //I think this should be -2 below due to that fact that we
    //hard coded the first and second rows.
    while (index < viewSize - 2) {
      triangle.push(newRow(triangle[index - 1]));

      index++;
    }
    //console.log(triangle);
  }

  renderSquare(x, y) {
    return <button id="square" codeX={x} codeY={y}></button>;
  }

  renderGreen(x, y, triangleItem) {
    var { triangle } = this.state;
    var width = triangle[y].length;
    if (y % 2 == 0) {
      var dif = Math.floor((this.props.sizeValue - width) / 2);
    } else var dif = Math.floor((this.props.sizeValue - width) / 2) - 1;

    if (x > dif - 1) {
      if (triangle[y][x - dif] % 2 == 0) {
        return (
          <button
            id="squareGreen"
            codeX={x}
            codeY={y}
            onClick={() => this.displayPascal(x, y, dif)}
          ></button>
        );
      } else if (triangle[y][x - dif] % 2 == 1)
        return (
          <button
            id="squareBlue"
            codeX={x}
            codeY={y}
            onClick={() => this.displayPascal(x, y, dif)}
          ></button>
        );
    } else
      return (
        <button
          id="squareEmpty"
          codeX={x}
          codeY={y}
          onClick={() => this.displayPascal(x, y, dif)}
        ></button>
      );
  }

  renderGreenO(x, y, triangleItem) {
    var { triangle } = this.state;
    return (
      <button
        id="squareGreenO"
        codeX={x}
        codeY={y}
        onClick={() => this.displayPascal(x, y)}
      ></button>
    );
  }

  renderGreenT(x, y, triangle) {
    return <button id="squareGreenT" codeX={x} codeY={y} value="1"></button>;
  }

  nextExplanation() {
    this.setState((state) => {
      return { stepz: this.state.stepz + 1 };
    });
  }

  skipExplanation() {
    this.setState((state) => {
      return { stepz: 5 };
    });
  }

  render() {
    var { triangle, specialCount, stepz } = this.state;
    const elementS = [];
    const elementZ = [];
    const viewSize = this.props.sizeValue;

    this.triangleBuilder();

    var x;
    var y;

    // - 3 on the special count helps line up (and not print too far down)
    //this is due to the hardcoded row one and two
    for (y = 0; y < specialCount - 3; y++) {
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

    const entireThingz = (
      <div>
        <button id="greatButton" onClick={() => this.builderOrigin()}>
          BUILD PASCAL/PINSKI TRIANGLE
        </button>
        <div className="things">{specialCount}</div>
        <div>
          <span>
            {elementZ.map((value, index) => {
              return <span key={index}>{value}</span>;
            })}
          </span>
        </div>
      </div>
    );

    const explanationZero = (
      <p id="explanation">
        <p>
          <p>Welcome to Sierpinki triangle!</p>
          <p>
            I challenged myself to build a version of Sierpinski's triangle in
            React that uses the calculation of Pascal's triangle to dictate its
            formation
          </p>
          In mathematics, Pascal's triangle determines the coefficients which
          arise in binomial expansions.
        </p>
        <button id="largebutton" onClick={() => this.nextExplanation()}>
          Next
        </button>
        <button id="largebutton" onClick={() => this.skipExplanation()}>
          Skip
        </button>
      </p>
    );

    const explanationOne = (
      <p id="explanation">
        <p>
          My algorithm first calculates Pascal's triangle up to row 'x' using a
          strategy such as:
        </p>
        <img src={firstimg} alt="mystery"></img>
        <button id="largebutton" onClick={() => this.nextExplanation()}>
          Next
        </button>
        <button id="largebutton" onClick={() => this.skipExplanation()}>
          Skip
        </button>
      </p>
    );

    const explanationTwo = (
      <p id="explanation">
        <p>
          The triangle is calculated up to a given size (nth row).
          <p>
            My algorithm starts to build the triangle with blue and green
            squares. Green squares are used when the Pascal calculation is
            'even'. Blue squares are used when the Pascal calculation is an
            'odd' number.
          </p>
          <p></p>
        </p>
        <button id="largebutton" onClick={() => this.nextExplanation()}>
          Next
        </button>
        <button id="largebutton" onClick={() => this.skipExplanation()}>
          Skip
        </button>
      </p>
    );

    const explanationThree = (
      <p id="explanation">
        <p id="imgcenter">
          <img id="imgcenter" src={secondimg} alt="mystery"></img>
          This is how the algorithm calculates where the green, blue and 'empty'
          squares need to be rendered.
        </p>
        <button id="largebutton" onClick={() => this.nextExplanation()}>
          Next
        </button>
        <button id="largebutton" onClick={() => this.skipExplanation()}>
          Skip
        </button>
      </p>
    );

    const explanationFour = (
      <p id="explanation">
        <p>
          Sierpinski's triangle is a 'fractal'. Pascal's triangle is used in
          Algebra, Number Theory, Probabilty and Combinatorics. Click next to
          see the triangle get built row by row in real-time.
        </p>
        <button id="largebutton" onClick={() => this.nextExplanation()}>
          Next
        </button>
        <button id="largebutton" onClick={() => this.skipExplanation()}>
          Skip
        </button>
      </p>
    );
    return (
      <p className="entireThing">
        {stepz == 0 ? explanationZero : null}
        {stepz == 1 ? explanationOne : null}
        {stepz == 2 ? explanationTwo : null}
        {stepz == 3 ? explanationThree : null}
        {stepz == 4 ? explanationFour : null}
        {stepz == 5 ? entireThingz : null}
      </p>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 60,
    };
  }
  enterCount() {
    var zvalue = document.getElementById("sizeHere").value;

    this.setState((state) => {
      return { count: zvalue };
    });
  }

  render() {
    var { count, specialCount } = this.state;

    const inputBox = <div class="counting">{specialCount}</div>;
    return (
      <div>
        <Building sizeValue={count} />
      </div>
    );
  }
}

export default App;

/*<div className="HeaderSpot">{inputBox}</div>
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

        */
