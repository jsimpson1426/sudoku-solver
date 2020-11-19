import Animator from "./animator";
import puzzleRandomizer from "./puzzleRandomizer";

class PuzzleSolver{

    constructor(){
        this.sudokuData = puzzleRandomizer.generatePuzzle();
        this.startData = [];
        this.animator = new Animator(50/4);
        this.isSolved = 0;

        for(let i = 0; i < 9 ; i++){
          this.startData.push([...this.sudokuData[i]]);
        }
    }

    moveIsValid = (val, row, col) => {
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

    backtrack = (row, column) => {
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
      this.animator.queueProgressAnimation([row, column]);

      //set currentBox to yellow and previousBox to green

      //if the cell is already populated, then skip it and return true
      if (this.sudokuData[row][column] !== 0) {
        if (!this.backtrack(row, column + 1)) {
          this.animator.queueBacktrackAnimation([row, column]);
          return false;
        } else {
          return true;
        }
      } else {
        //for each number 1-9 that can go in a sudoku cell
        for (let i = 0; i < 9; i++) {
          this.animator.queueNumberAnimation(i + 1, [row, column]);
          if (this.moveIsValid(i + 1, row, column)) {
            //Try the number i
            this.sudokuData[row][column] = i + 1;

            //if it doesn't work, then backtrack
            if (!this.backtrack(row, column + 1)) {
              this.sudokuData[row][column] = 0;
              this.animator.queueBacktrackAnimation([row, column]);
            } else {
              return true;
            }
          }
        }
        this.animator.queueDeletionAnimation([row, column]);
        return false;
      }
    }

    isSolved = () =>  {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; i++) {
          if (this.sudokuData[i][j] !== this.solvedArray[i][j]) {
            return false;
          }
        }
      }
      return true;
    }

    print = () => {
      for (let i = 0; i < this.sudokuData.length; i++) {
        console.log(this.sudokuData[i]);
      }
    }

    stop = () => {
      for(let i = 0; i < this.animator.animationQueue.length; i++){
        clearTimeout(this.animator.animationQueue[i]);
      }
    }

    solve = () => {
      if(this.isSolved){
        this.reset();
      }
      let delay = 10.1 - document.getElementById("slider").value/10;
      this.animator = new Animator(delay);
      document.getElementById("start").textContent = "Restart";
      this.animator.disableUI();
      this.backtrack(0, 0);
      this.animator.queueCompletionAnimation();
      this.animator.queueEnableAnimation();
      this.animator.animate();
      this.isSolved = 1;
    }

    reset = () => {
      this.sudokuData = [];
      for(let i = 0; i < 9 ; i++){
        this.sudokuData.push([...this.startData[i]]);
      }
      for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
          const eID = "SudokuBox" + i + j;
          document.getElementById(eID).innerHTML = this.sudokuData[i][j] ? "<b>" + this.sudokuData[i][j].toString() +"</b>" : "";
          document.getElementById(eID).style.backgroundColor = "#ebebeb";
        }
      }
      document.getElementById("start").textContent = "Start";
      this.isSolved = 0;
    }

    newPuzzle = () => {
      this.sudokuData = puzzleRandomizer.generatePuzzle();
      this.startData = [];
      for(let i = 0; i < 9 ; i++){
        this.startData.push([...this.sudokuData[i]]);
      }
      for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
          const eID = "SudokuBox" + i + j;
          document.getElementById(eID).innerHTML = this.sudokuData[i][j] ? "<b>" + this.sudokuData[i][j].toString() +"</b>" : "";
          document.getElementById(eID).style.backgroundColor = "#ebebeb";
        }
      }
      
    }
}

export default new PuzzleSolver();