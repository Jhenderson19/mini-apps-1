//MODEL
//CLASSES
class Player {
  constructor(letter) {
    this.name = letter + '';
  }
}

class Board {
  constructor(width) {
    if(width < 3) {
      throw new Error('Minimum Board Size is 3\nReceived '+width);
    }
    this.players = [];
    this.playerCount = 0;
    this.turn = 0;

    this.data = [];
    for(let i = 0; i < width; i++) {
      this.data.push(new Array(width).fill(0));
    }

    this.spacesUsed = 0
    this.gameOver = false;
  }
  tied() {
    return this.spacesUsed === this.data.length ** 2;
  }
  getActivePlayer() {
    return this.players[this.turn];
  }

  register(player) {
    this.players.push(player);
    this.playerCount++;
    return this.playerCount;
  }

  nextTurn() {
    if(this.players.length === 0) {
      throw new Error('No Registered Players');
    }
    this.turn++;
    if(this.turn >= this.playerCount) {
      this.turn = 0;
    }
  }

  takeTurn(x, y) {
    if(this.gameOver)
      return false;

    if(this.data[x][y] === 0) {
      this.data[x][y] = this.players[this.turn].name;
      this.spacesUsed++;
      return true;
    }
    return false;
  }

  checkWin() {
    var winDetected = 0;

    //CHECK ROWS
    this.data.forEach(row => {
      if(row[0]) {
        var winPossible = true;
        row.forEach(cell => {
          cell === row[0] ? undefined : winPossible = false;
        })
        winDetected += winPossible;
      }

    });
    if(winDetected) {
      return winDetected;
    }

    //CHECK COLUMNS
    for(var colIndex = 0; colIndex < this.data.length; colIndex++) {

      if(this.data[0][colIndex]) {
        var curCol = [];
        this.data.forEach(row => {
          curCol.push(row[colIndex]);
        })

        var winPossible = true;
        curCol.forEach(cell => {
          cell === curCol[0] ? undefined : winPossible = false;
        })
        winDetected += winPossible;
      }
    }
    if(winDetected) {
      return winDetected;
    }

    //CHECKDIAGS
    let f = this.data.length - 1;
    var majDWP = 1; //MAJOR DIAGONAL WIN POSSIBLE
    var minDWP = 1; //MINOR DIAGONAL WIN POSSIBLE
    majDWP *= (this.data[0][0] !== 0);
    minDWP *= (this.data[0][f] !== 0);

    if(majDWP || minDWP) {
      for(var i = 0; i < this.data.length; i++) {
        majDWP *= this.data[i][i] === this.data[0][0];
        minDWP *= this.data[i][f - i] === this.data[0][f];
      }
    }
    return (minDWP || majDWP);

  }

}

class DomObjWrapper {
  constructor(domObj) {
    this.obj = domObj;
    this.initHTML = domObj.innerHTML;
  }
  reset() {
    this.obj.innerHTML = this.initHTML;
  }
}

//SETUP
var resetStorage = {};
var board;

var initBoard = function() {
  board = new Board(3);
  board.register(new Player('X'));
  board.register(new Player('O'));
}

var onload = function() {
  resetStorage.table = new DomObjWrapper(document.getElementById('table'));
  resetStorage.winDisplay = new DomObjWrapper(document.getElementById('winstate'));

  initBoard();
}


//CONTROLLER
var makeMove = function(x, y) {

  if(board.takeTurn(x, y)) { //control model
    document.getElementById(''+ x + y).innerHTML = board.getActivePlayer().name; //control view

    if(board.checkWin()) {
      displayWin(board.getActivePlayer());
    } else if(board.tied()) {
      displayDraw();
    } else {
      board.nextTurn();
    }

  } else {
    console.warn('Invalid Move');
  }

}

var displayDraw = function(player) {
  var winstr = 'Draw!';

  console.log(winstr);
  document.getElementById('winstate').innerHTML = winstr;
}

var displayWin = function(player) {
  var winstr = `${player.name.toUpperCase()} WINS!`;

  console.log(winstr);
  document.getElementById('winstate').innerHTML = winstr;
}

var reset = function() {
  initBoard();
  for (var domObj in resetStorage) {
    resetStorage[domObj].reset();
  }
}
