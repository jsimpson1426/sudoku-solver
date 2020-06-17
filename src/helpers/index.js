class SudokuSolver {
  constructor(startArray, solvedArray) {
    this.unsolvedArray = startArray;
    this.solvedArray = solvedArray;
  }

  moveIsValid(val, row, col) {
    // check row
    for (let i = 0; i < this.unsolvedArray[row].length; i++) {
      if (val === this.unsolvedArray[row][i]) {
        return false;
      }
    }

    // check column
    for (let i = 0; i < this.unsolvedArray.length; i++) {
      if (val === this.unsolvedArray[i][col]) {
        return false;
      }
    }

    //check 3x3 SubGrid
    //first determine which SubGrid we are in
    let subGridRow = Math.floor(row / 3);
    let subGridCol = Math.floor(col / 3);
    for (let i = 3 * subGridRow; i < 3 * subGridRow + 3; i++) {
      for (let j = 3 * subGridCol; j < 3 * subGridCol + 3; j++) {
        if (this.unsolvedArray[i][j] === val) {
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

    //if the cell is already populated, then skip it and return true
    if (this.unsolvedArray[row][column] !== 0) {
      if (!this.backtrack(row, column + 1)) {
        return false;
      } else {
        return true;
      }
    } else {
      //for each number 1-9 that can go in a sudoku cell
      for (let i = 0; i < 9; i++) {
        if (this.moveIsValid(i + 1, row, column)) {
          //Try the number i
          this.unsolvedArray[row][column] = i + 1;
          //if it doesn't work, then backtrack
          if (!this.backtrack(row, column + 1)) {
            this.unsolvedArray[row][column] = 0;
          } else {
            return true;
          }
        }
      }

      return false;
    }
  }

  isSolved() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; i++) {
        if (this.unsolvedArray[i][j] !== this.solvedArray[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  print() {
    for (let i = 0; i < this.unsolvedArray.length; i++) {
      console.log(this.unsolvedArray[i]);
    }
  }

  solve() {
    this.backtrack(0, 0);

    this.print();
  }
}

let puzzle = new SudokuSolver(
  [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
  ],
  [
    [4, 3, 5, 2, 6, 9, 7, 8, 1],
    [6, 8, 2, 5, 7, 1, 4, 9, 3],
    [1, 9, 7, 8, 3, 4, 5, 6, 2],
    [8, 2, 6, 1, 9, 5, 3, 4, 7],
    [3, 7, 4, 6, 8, 2, 9, 1, 5],
    [9, 5, 1, 7, 4, 3, 6, 2, 8],
    [5, 1, 9, 3, 2, 6, 8, 7, 4],
    [2, 4, 8, 9, 5, 7, 1, 3, 6],
    [7, 6, 3, 4, 1, 8, 2, 5, 9]
  ]
);

puzzle.solve();
