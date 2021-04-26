import React from 'react';
import Board from '../classes/Board.js';
import TurnTracker from '../classes/TurnTracker.js';
import AddChipButton from './AddChipButton.jsx';

var board = new Board();
var tracker = new TurnTracker();

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      viewboard: [[]],
      winner: false
    }
  }
  stageUpdate() {
    this.setState({viewboard: board.renderableBoard(), winner: board.winner});
    tracker.nextPlayer();
  }
  render() {
    return (
        <div>
          <div>
            {this.state.winner ? <h1>{this.state.winner + ' Wins! Congrats!'}</h1> : tracker.getCurrentPlayer()+`'s turn.`}
          </div>
        <table>
          <tbody>
            {board.renderableBoard().map((row) => {
              return (
                <tr>
                  {row.map((cell) => {
                    return (<td>{cell}</td>);
                  })}
                </tr>
              )
            })}
            <tr>
              {[...Array(7).keys()].map((value) => {
                return (
                  <td>
                    <AddChipButton
                      functions={{
                        addChip: board.addChip.bind(board),
                        stageUpdate: this.stageUpdate.bind(this)
                      }}
                      index={value}
                      player={tracker.getCurrentPlayer()}
                    />
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;