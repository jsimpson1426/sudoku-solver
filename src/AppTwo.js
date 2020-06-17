import React, { Component } from "react";

class AppTwo extends Component {
  state = {
    counter: [0, 0],
  };

  increment(i, j) {
    let counter = [i, j];
    this.setState({ counter });
    console.log(i, j);
  }

  delay(i, j) {
    setTimeout(this.increment(i, j), 1000);
  }

  count() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.delay(i, j);
      }
    }
  }

  componentDidMount() {
    this.count();
  }

  render() {
    return (
      <div className="App">
        <h1>Timer</h1>
        <h3>{this.state.counter}</h3>
      </div>
    );
  }
}

export default AppTwo;
