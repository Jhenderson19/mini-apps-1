import React from 'react';
import Board from '../classes/Board.js';
import AddChipButton from './AddChipButton.jsx';
import css from './styles/app.css';
import css1 from './styles/chips.css';


var board = new Board();

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      viewboard: [[]],
      winner: false
    }
  }
  componentDidMount() {
    this.stageUpdate();
  }
  stageUpdate() {
    this.setState({viewboard: board.renderableBoard(), winner: board.winner});
  }
  render() {
    return (
        <div>
          <div>
            {
              !this.state.winner ? board.tracker.getCurrentPlayer()+`'s turn.` :
              this.state.winner !== 'tie' ?
                <h1>{this.state.winner + ' Wins! Congrats!'}</h1> :
                <h1>Tie Game! Better Luck Next Time...</h1>
            }
          </div>
        <table>
          <tbody>
            {this.state.viewboard.map((row) => {
              return (
                <tr>
                  {row.map((cell) => {
                    return (<td className={`chip ${cell}`}>{cell}</td>);
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