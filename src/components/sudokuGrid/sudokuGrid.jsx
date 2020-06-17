import React, { Component } from "react";
import "./sudokuGrid.sass";

class SudokuGrid extends Component {
  state = { sudokuData: this.props.sudokuData };

  render() {
    return (
      <table className="puzzle-container">
        <tbody>
          {this.state.sudokuData.map((row, indexRow) => (
            <tr
              key={indexRow.toString()}
              id={"SudokuRow" + indexRow.toString()}
              className={indexRow && indexRow % 3 === 0 ? "row-bold" : "row"}
            >
              {row.map((value, indexCell) => (
                <td
                  className={
                    indexCell && indexCell % 3 === 0 ? "box-bold" : "box"
                  }
                  key={indexRow.toString() + indexCell.toString()}
                  id={"SudokuBox" + indexRow.toString() + indexCell.toString()}
                >
                  <b>{value ? value : null}</b>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default SudokuGrid;
