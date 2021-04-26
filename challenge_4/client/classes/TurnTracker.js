class TurnTracker {
  constructor(players = ['Red', 'Black'], randomStart = true) {
    this.players = players;
    randomStart ? this.currentPlayer = Math.floor(Math.random() * players.length) : this.currentPlayer = 0;
  }
  nextPlayer() {
    this.currentPlayer = (this.currentPlayer + 1 ) % this.players.length;
  }
  getCurrentPlayer() {
    return this.players[this.currentPlayer];
  }
}

export default TurnTracker;