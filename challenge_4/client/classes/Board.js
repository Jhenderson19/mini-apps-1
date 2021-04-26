import Column from './Column.js';

class Board {
  constructor() {
    this.columns = [
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
      new Column(),
    ];
    this.winner = false;
    this.winCondition = 4;
  }
  renderableBoard() {
    console.log('renderable board generating');
    var renderBoard = [];
    for(let i = this.columns[0].max - 1; i >= 0; i--) {
      renderBoard.push([]);
      for(let j = 0; j < this.columns.length; j++) {
        renderBoard[renderBoard.length - 1].push(this.columns[j].chipAt(i));
      }
    }
    return renderBoard;
  }
  addChip(val, col) {
    var x = this.columns[col].addChip(val);
    this.winner = this.detectWin(col);
    return x;
  }
  detectWin(col) {
    return this.detectVerticalWin(col) || this.detectHorizontalWin(col) || this.detectDiagonalWin(col);
  }
  detectVerticalWin(col) {
    var column = this.columns[col];
    if (column.height() < this.winCondition) return false;
    var topChip = column.topChip();
    var streak = 0;
    for (let i = column.topChipIndex(); i >= 0; i--) {
      if(column.chipAt(i) === topChip) {
        streak++;
        if(streak === this.winCondition) {
          return topChip;
        }
      } else {
        return false;
      }
    }
  }
  detectHorizontalWin(col) {
    var topChip = this.columns[col].topChip();
    var height = this.columns[col].topChipIndex();

    var look = (direction) => {
      var total = 0;
      if (direction === 'left') {
        var check = (col) => { return col > 0; };
        var start = col - 1;
        var limit = (i) => { return i >= 0; };
        var increment = (i) => { return i - 1; };
      } else {
        var check = (col) => { return col < this.columns.length - 1; };
        var start = col + 1;
        var limit = (i) => { return i < this.columns.length; };
        var increment = (i) => { return i + 1; };
      }
      if(check(col)) {
        for(let i = start; limit(i); i = increment(i)) {
          if(this.columns[i].chipAt(height) === topChip) {
            total++;
          } else {
            break;
          }
        }
      }
      return total;
    }

    if(look('left') + look('right') + 1 >= this.winCondition) {
      return topChip;
    } else {
      return false;
    }
  }
  detectDiagonalWin(col) {
    var topChip = this.columns[col].topChip();
    var height = this.columns[col].topChipIndex();

    var look = (hor, vert) => {
      var total = 0;
      if (hor === 'left') {
        var check = (col) => { return col > 0; };
        var start = col - 1;
        var limit = (i) => { return i >= 0; };
        var increment = (i) => { return i - 1; };
      } else {
        var check = (col) => { return col < this.columns.length - 1; };
        var start = col + 1;
        var limit = (i) => { return i < this.columns.length; };
        var increment = (i) => { return i + 1; };
      }
      if (vert === 'up') {
        var vertInc = (height, dist) => {
          return height + dist;
        }
      } else {
        var vertInc = (height, dist) => {
          return height - dist;
        }
      }
      if(check(col)) {
        for(let i = start; limit(i); i = increment(i)) {
          if(this.columns[i].chipAt(vertInc(height, Math.abs(i - col))) === topChip) {
            total++;
          } else {
            break;
          }
        }
      }
      return total;
    }

    if (look('left', 'up') + look('right', 'down') + 1 >= this.winCondition) {
      return topChip;
    } else if (look('left', 'down') + look('right', 'up') + 1 >= this.winCondition) {
      return topChip;
    } else {
      return false;
    }
  }
}


export default Board;