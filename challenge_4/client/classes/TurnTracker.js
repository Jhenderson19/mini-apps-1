class TurnTracker {
  constructor(players = ['Red', 'Black']) {
    this.players = players;
    this.currentPlayer = 0;
  }
  nextPlayer() {
    this.currentPlayer = (this.currentPlayer + 1 ) % this.players.length;
  }
  getCurrentPlayer() {
    return this.players[this.currentPlayer];
  }
}

export default TurnTracker;