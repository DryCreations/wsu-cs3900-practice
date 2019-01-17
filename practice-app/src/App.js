import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <Game />
    );
  }
}

class Square extends Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Column extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[this.props.value][i]}
        onClick={() => {this.props.handleClick(this.props.value, i)}}
      />
    );
  }

  render() {
    return (
      <div className="column">
        {this.renderSquare(5)}
        {this.renderSquare(4)}
        {this.renderSquare(3)}
        {this.renderSquare(2)}
        {this.renderSquare(1)}
        {this.renderSquare(0)}
      </div>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);

    var c = [];
    for(var i = 0; i < 7; i++) {
      var r = [];
      for(var j = 0; j < 6; j++) {
        r.push(null);
      }
      c.push(r);
    }

    this.state = {
      squares: c,
      xIsNext: true,
      turn: 0,
      winner: 'C',
    };


  }

  handleClick(i, j) {
    if (this.state.winner === 'C') {
      const squares = this.state.squares.slice();
      for(var k = 0; squares[i][k] != null; k++);

      if (k < squares[i].length) {

        squares[i][k] = this.state.xIsNext ? 'X' : 'O';
        this.setState ({xIsNext: !this.state.xIsNext,
                        turn: this.state.turn + 1,
                        squares: squares,
                        winner: this.checkWin(i, k),
                      });
      }
    }
  }

  checkWin(i, j) {
    var counter, k, p;

    //vertical match
    counter = 1;
    for(k = j - 1; k >= 0 && this.state.squares[i][j] === this.state.squares[i][k]; k--, counter++);
    for(k = j + 1; k < this.state.squares[i].length && this.state.squares[i][j] === this.state.squares[i][k]; k++, counter++);

    if (counter >= 4) return this.state.squares[i][j];


    //horizontal match
    counter = 1;
    for(k = i - 1; k >= 0 && this.state.squares[i][j] === this.state.squares[k][j]; k--, counter++);
    for(k = i + 1; k < this.state.squares.length && this.state.squares[i][j] === this.state.squares[k][j]; k++, counter++);

    if (counter >= 4) return this.state.squares[i][j];


    //diagonal / match

    counter = 1;
    for(k = j + 1, p = i + 1; k < this.state.squares[i].length && p < this.state.squares.length && this.state.squares[i][j] === this.state.squares[p][k]; k++, p++, counter++);
    for(k = j - 1, p = i - 1; k >= 0  && p >= 0 && this.state.squares[i][j] === this.state.squares[p][k]; k--, p--, counter++);

    if (counter >= 4) return this.state.squares[i][j];


    //diagonal \ match

    counter = 1;
    for(k = j + 1, p = i - 1; k < this.state.squares[i].length && p >= 0 && this.state.squares[i][j] === this.state.squares[p][k]; k++, p--, counter++);
    for(k = j - 1, p = i + 1; k >= 0  && p < this.state.squares.length && this.state.squares[i][j] === this.state.squares[p][k]; k--, p++, counter++);

    if (counter >= 4) return this.state.squares[i][j];

    if(this.state.turn === 41) return 'T';

    return 'C';
  }

  renderColumn(i) {
    return(
      <Column
        value={i}
        squares={this.state.squares}
        handleClick={(i, j) => this.handleClick(i, j)}
      />
    );
  }

  render() {
    var status;
    if (this.state.winner === 'C') {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    } else if (this.state.winner === 'T') {
      status = 'Tie!';
    } else {
      status = this.state.winner + ' Wins!';
    }

    return (
      <div className="container">
        <div className="status">
          {status}
        </div>
        <div className="board">
          {this.renderColumn(0)}
          {this.renderColumn(1)}
          {this.renderColumn(2)}
          {this.renderColumn(3)}
          {this.renderColumn(4)}
          {this.renderColumn(5)}
          {this.renderColumn(6)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <Board />
      </div>
    );
  }
}

export default App;
