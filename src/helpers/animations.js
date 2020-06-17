class NumberAnimation {
  constructor(value, position, delay) {
    this.value = value;
    this.position = position;
    this.delay = delay;
  }

  animate(index) {
    setTimeout(() => {
      const eID = "SudokuBox" + this.position[0] + this.position[1];
      document.getElementById(eID).innerHTML = this.value.toString();
    }, index * this.delay);
  }
}

class ProgressAnimation {
  constructor(position, delay) {
    this.position = position;
    this.delay = delay;
  }

  animate(index) {
    setTimeout(() => {
      const eID = "SudokuBox" + this.position[0] + this.position[1];

      //if the row and column are zero, then we ignore this part
      if (!(!this.position[0] && !this.position[1])) {
        let prevRow = this.position[0];
        let prevColumn = this.position[1] - 1;

        if (prevColumn < 0) {
          prevRow--;
          prevColumn = 8;
        }

        const prevID = "SudokuBox" + prevRow.toString() + prevColumn.toString();
        document.getElementById(prevID).style.backgroundColor = "#FFFEBF";
      }
      document.getElementById(eID).style.backgroundColor = "magenta";
    }, index * this.delay);
  }
}

class DeletionAnimation {
  constructor(position, delay) {
    this.position = position;
    this.delay = delay;
  }

  animate(index) {
    setTimeout(() => {
      const eID = "SudokuBox" + this.position[0] + this.position[1];

      //if the row and column are zero, then we ignore this part
      if (!(!this.position[0] && !this.position[1])) {
        let prevRow = this.position[0];
        let prevColumn = this.position[1] - 1;

        if (prevColumn < 0) {
          prevRow--;
          prevColumn = 8;
        }

        const prevID = "SudokuBox" + prevRow.toString() + prevColumn.toString();
        document.getElementById(prevID).style.backgroundColor = "magenta";
      }

      document.getElementById(eID).style.backgroundColor = "#ebebeb";
      document.getElementById(eID).innerHTML = "";
    }, index * this.delay);
  }
}

class BacktrackAnimation {
  constructor(position, delay) {
    this.position = position;
    this.delay = delay;
  }

  animate(index) {
    setTimeout(() => {
      const eID = "SudokuBox" + this.position[0] + this.position[1];

      if (!(this.position[0] == 8) || !(this.position[1] == 8)) {
        let nextRow = this.position[0];
        let nextColumn = this.position[1] + 1;

        if (nextColumn >= 9) {
          nextRow++;
          nextColumn = 0;
        }

        const nextID = "SudokuBox" + nextRow.toString() + nextColumn.toString();

        document.getElementById(nextID).style.backgroundColor = "#ebebeb";
      }

      document.getElementById(eID).style.backgroundColor = "magenta";
    }, index * this.delay);
  }
}

class CompletionAnimation {
  constructor(delay) {
    this.delay = delay;
  }

  animate(index) {
    setTimeout(() => {
      let eID = "";
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          eID = "SudokuBox" + i.toString() + j.toString();
          document.getElementById(eID).style.backgroundColor = "#32FF54";
        }
      }
    }, index * this.delay);
  }
}

export {
  NumberAnimation,
  ProgressAnimation,
  DeletionAnimation,
  BacktrackAnimation,
  CompletionAnimation,
};
