import React, { Component } from "react";
import SudokuGrid from "./components/sudokuGrid/sudokuGrid";
import Animator from "./helpers/animator";
import "./App.css";

class App extends Component {
  sudokuData = [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0],
  ];

  moveIsValid(val, row, col) {
    // check row
    for (let i = 0; i < this.sudokuData[row].length; i++) {
      if (val === this.sudokuData[row][i]) {
        return false;
      }
    }

    // check column
    for (let i = 0; i < this.sudokuData.length; i++) {
      if (val === this.sudokuData[i][col]) {
        return false;
      }
    }

    //check 3x3 SubGrid
    //first determine which SubGrid we are in
    let subGridRow = Math.floor(row / 3);
    let subGridCol = Math.floor(col / 3);
    for (let i = 3 * subGridRow; i < 3 * subGridRow + 3; i++) {
      for (let j = 3 * subGridCol; j < 3 * subGridCol + 3; j++) {
        if (this.sudokuData[i][j] === val) {
          return false;
        }
      }
    }

    //return true if val fits in column, row and SubGrid
    return true;
  }

  backtrack(row, column) {
    //if we are at the end of the row, go to the beginning of the next row
    if (column >= 9) {
      row = row + 1;
      column = 0;
    }

    //if valid choices have been made for each spot on the grid then we will reach row = 9
    //When row = 9 return true
    if (row >= 9) {
      return true;
    }

    //animator.switchFocus(previousCoords, newCoords);
    Animator.queueProgressAnimation([row, column]);

    //set currentBox to yellow and previousBox to green

    //if the cell is already populated, then skip it and return true
    if (this.sudokuData[row][column] !== 0) {
      if (!this.backtrack(row, column + 1)) {
        Animator.queueBacktrackAnimation([row, column]);
        return false;
      } else {
        return true;
      }
    } else {
      //for each number 1-9 that can go in a sudoku cell
      for (let i = 0; i < 9; i++) {
        Animator.queueNumberAnimation(i + 1, [row, column]);
        if (this.moveIsValid(i + 1, row, column)) {
          //Try the number i
          this.sudokuData[row][column] = i + 1;

          //if it doesn't work, then backtrack
          if (!this.backtrack(row, column + 1)) {
            this.sudokuData[row][column] = 0;
            Animator.queueBacktrackAnimation([row, column]);
          } else {
            return true;
          }
        }
      }
      Animator.queueDeletionAnimation([row, column]);
      return false;
    }
  }

  isSolved() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; i++) {
        if (this.sudokuData[i][j] !== this.solvedArray[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  componentDidMount = () => {
    this.solve();
  };

  print() {
    for (let i = 0; i < this.sudokuData.length; i++) {
      console.log(this.sudokuData[i]);
    }
  }

  solve() {
    this.backtrack(0, 0);
    Animator.queueCompletionAnimation();
    Animator.animate();
    this.print();
  }

  render() {
    return (
      <div className="App">
        <SudokuGrid sudokuData={this.sudokuData} />
      </div>
    );
  }
}

export default App;
