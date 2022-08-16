let cells = document.querySelectorAll(".cell");
let playerTurn = document.querySelector(".playerTurn");

class Player {
  constructor(name, playerSide) {
    this.name = name;
    this.playerSide = playerSide;
  }
}

const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");

class GameState {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = this.player1;
  }

  play() {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        cell.innerText = this.currentPlayer.playerSide;

        if (this.currentPlayer === player1) {
          this.currentPlayer = this.player2;
          console.log("First");
          playerTurn.innerText = this.currentPlayer.name;
        } else {
          this.currentPlayer = this.player1;
          playerTurn.innerText = this.currentPlayer.name;
        }
      });
    });
  }

  getCurrentPlayer() {
    console.log(this.currentPlayer);
  }
}

let game = new GameState(player1, player2);
game.getCurrentPlayer();
game.play();

// cells.forEach((cell, index) => {
//   cell.addEventListener("click", () => {
//     cell.innerText = player1.playerSide;
//     console.log(index);
//   });
// });
