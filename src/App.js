import React, { Component } from "react";
import SudokuGrid from "./components/sudokuGrid/sudokuGrid";
import PuzzleSolver from "./helpers/puzzleSolver";
import SlideButton from './components/common/slideButton/slideButton';
import Slider from "./components/common/slider/slider";
import "./App.sass";

class App extends Component {


  render() {
    return (
      <div className="App">
        <h1 className="sudoku-h1">Sudoku Solver</h1>
        <ul className="sudoku-ul">
          <li className="sudoku-li">
            <Slider id="slider"/>
          </li>
          <li className="sudoku-li"><SlideButton clickFunction={PuzzleSolver.solve} btnText="Start" id="start"/></li>
          <li className="sudoku-li"><SlideButton clickFunction={PuzzleSolver.newPuzzle} btnText="New Puzzle" id="new"/></li>
        </ul>
        <SudokuGrid sudokuData={PuzzleSolver.sudokuData} />
      </div>
    );
  }
}

export default App;
