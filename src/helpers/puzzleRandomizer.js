import { puzzles } from './puzzles';


class puzzleRandomizer {
  constructor() {
    this.allPuzzles = puzzles;
    this.currentPuzzleIndex = -1;
    this.puzzleString = "";
    this.currentPuzzle = [];

  }

  randomizePuzzle() {
    let randomNum = Math.floor(Math.random() * 100);
    while (this.currentPuzzleIndex === randomNum) {
      randomNum = Math.floor(Math.random() * 100);
    }
    this.currentPuzzleIndex = randomNum;
    this.puzzleString = this.allPuzzles[this.currentPuzzleIndex];
  }

  parsePuzzle(){
    let puzzle = this.puzzleString; 
  
    let start = 0;
    let end = 0;
  
    let result = [];
    let tempRow = "";
    let finalRow = [];
  
    for (let i = 0; i < 9; i++) {
      start = i === 0 ? i : i * 9;
      end = start + 9;
      tempRow = puzzle.slice(start, end);
      finalRow = [];
      for (let j = 0; j < 9; j++) {
        // tempRow.slice(j, j + 1) provides the single digit from the row given the position set by j
        // parseInt converts it to an integer from a string
        // then it is pushed onto the row
        finalRow.push(parseInt(tempRow.slice(j, j + 1)));
      }
      result.push(finalRow);
    }
  
    this.currentPuzzle = result;
  }

  generatePuzzle(){
    this.randomizePuzzle()
    this.parsePuzzle()
    return this.currentPuzzle;
  }

}

export default new puzzleRandomizer();