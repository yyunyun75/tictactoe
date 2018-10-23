import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    let squares = Array(3);
    for(let i=0; i<3; i++){
      squares[i] = [null, null, null];
    }

    this.state={
      history: [{squares}],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(x, y){
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length-1];
    const squares = JSON.parse(JSON.stringify(current.squares)); //array.slice()does not do deep copy
    if(calculateWinner(squares)||squares[x][y]) return;
    squares[x][y] = this.state.xIsNext ? "X": "O";
    this.setState({
      history: history.concat([{squares}]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo = (indx)=>{
    this.setState({
      stepNumber: indx,
      xIsNext: (indx %2) === 0
    });
  }

  render(){
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const winner = calculateWinner(current.squares);
    const moves = history.map((step, indx)=>{
      const desc = indx ? `Go to move #${indx}` : 'Go to game start';
      return (
        <li key={indx}>
          <button onClick={()=>this.jumpTo(indx)}>{desc}</button>
        </li>
      )
    })

    let status;
    if(winner){
      status = "Winner: "+winner;
    }else{
      status = "Next Player: "+ (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="App">
        <div className="game-board">
          <Board squares={current.squares} onClick={(x, y)=>this.handleClick(x, y)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

class Board extends Component{
  render(){
    const myArr = this.props.squares;
    return (
      <div>
        {
          myArr.map((row, rowIndx)=>{
            return (
                <div className="board-row" key={rowIndx}>
                {
                  row.map((item, colIndx) => {
                    return (
                      <button className="square"
                              key={rowIndx+'-'+colIndx}
                              onClick={()=>this.props.onClick(rowIndx, colIndx)}>
                        {item}
                      </button>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

function calculateWinner(squares){
  if(squares[0][0]!==null){
    let result = true;
    for(let i=0; i<3; i++){
      result &= (squares[i][i]===squares[0][0]);
    }
    if(result) return squares[0][0];
  }
  if(squares[0][2]!==null){
    if(squares[0][2]===squares[1][1] && squares[0][2]===squares[2][0]) return squares[0][2];
  }

  for(let i=0; i<3; i++){
    if(squares[i][0]!==null && (squares[i][0]===squares[i][1]&&squares[i][0]===squares[i][2])) return squares[i][0];
    if(squares[0][i]!==null && (squares[0][i]===squares[1][i]&&squares[0][i]===squares[2][i])) return squares[0][i];
  }

  return null;
}

export default App;
