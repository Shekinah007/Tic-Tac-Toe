const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector(".reset");
const playerTurn = document.querySelector(".playerTurn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalMessage = document.querySelector(".message");

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
    this.boardTrack = ["", "", "", "", "", "", "", "", ""];
    this.winState = "false";
  }

  win(currentPlayer, cell) {
    if (
      (this.boardTrack[0] == this.boardTrack[1] &&
        this.boardTrack[0] == this.boardTrack[2] &&
        this.boardTrack[0] != "") ||
      (this.boardTrack[0] == this.boardTrack[3] &&
        this.boardTrack[0] == this.boardTrack[6] &&
        this.boardTrack[0] != "") ||
      (this.boardTrack[0] == this.boardTrack[4] &&
        this.boardTrack[0] == this.boardTrack[8] &&
        this.boardTrack[0] != "") ||
      (this.boardTrack[1] == this.boardTrack[4] &&
        this.boardTrack[1] == this.boardTrack[7] &&
        this.boardTrack[1] != "") ||
      (this.boardTrack[3] == this.boardTrack[4] &&
        this.boardTrack[3] == this.boardTrack[5] &&
        this.boardTrack[3] != "") ||
      (this.boardTrack[6] == this.boardTrack[7] &&
        this.boardTrack[6] == this.boardTrack[8] &&
        this.boardTrack[6] != "") ||
      (this.boardTrack[2] == this.boardTrack[4] &&
        this.boardTrack[2] == this.boardTrack[6] &&
        this.boardTrack[2] != "") ||
      (this.boardTrack[2] == this.boardTrack[5] &&
        this.boardTrack[2] == this.boardTrack[8] &&
        this.boardTrack[2] != "")
    ) {
      this.winState = "true";
      console.log(currentPlayer.name, " Wins!");
      modal.classList.add("display");
      overlay.classList.add("overlay-display");
      modalMessage.innerText = currentPlayer.name + "  Wins!";
      // alert(currentPlayer.name + " Wins!");
    } else if (
      this.boardTrack[0] != "" &&
      this.boardTrack[1] != "" &&
      this.boardTrack[2] != "" &&
      this.boardTrack[3] != "" &&
      this.boardTrack[4] != "" &&
      this.boardTrack[5] != "" &&
      this.boardTrack[6] != "" &&
      this.boardTrack[7] != "" &&
      this.boardTrack[8] != ""
    ) {
      this.winState = "draw";
      console.log(currentPlayer.name, ": Its a draw!");
      modal.classList.add("display");
      overlay.classList.add("overlay-display");
      modalMessage.innerText = "Its a Draw!";
      // alert(currentPlayer.name + ": Its a draw!");
    }
  }

  newGame() {
    this.winState = "false";
    this.currentPlayer = this.player1;
    this.boardTrack = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.innerText = "";
    });
  }

  play() {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (cell.innerText != "") return;
        if (this.winState == "true" || this.winState == "draw") return;
        console.log(index + 1);

        this.updateGameState(index, this.currentPlayer);
        cell.innerText = this.currentPlayer.playerSide;
        this.win(this.currentPlayer, cell);

        if (this.currentPlayer === player1) {
          this.currentPlayer = this.player2;
          playerTurn.innerText = this.currentPlayer.name;
        } else {
          this.currentPlayer = this.player1;
          playerTurn.innerText = this.currentPlayer.name;
        }
      });
    });
  }

  updateGameState(index, currentPlayer) {
    for (let i = 0; i < this.boardTrack.length; i++) {
      if (i == index) {
        this.boardTrack[i] = currentPlayer.playerSide;
      }
    }
    console.log(this.boardTrack);
  }
}

let roundOne = new GameState(player1, player2);
roundOne.play();

resetButton.addEventListener("click", () => {
  roundOne.newGame();
  modal.classList.remove("display");
  overlay.classList.remove("overlay-display");
});
