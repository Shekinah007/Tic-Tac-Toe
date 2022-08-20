// import { playerOne } from "./indexScript.js";
// console.log("Player One: ", playerOne.name);

const body = document.querySelector("body");
const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector(".reset");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalMessage = document.querySelector(".message");
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const playButton = document.querySelector(".play");
const player1Display = document.querySelector(".player1");
const player2Display = document.querySelector(".player2");

class Player {
  constructor(name, playerSide) {
    this.name = name;
    this.playerSide = playerSide;
  }
}

const player1 = new Player(localStorage.getItem("playerOne"), "X");
const player2 = new Player(localStorage.getItem("playerTwo"), "O");
player1Display.innerText = player1.name + " [X]";
player2Display.innerText = player2.name + " [O]";

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
        if (cell.innerText != "") {
          alert("That position is already occupied!");
          return;
        }
        if (this.winState == "true" || this.winState == "draw") return;
        console.log(index + 1);

        player1Display.classList.toggle("selected");
        player2Display.classList.toggle("selected");

        this.updateGameState(index, this.currentPlayer);
        cell.innerText = this.currentPlayer.playerSide;
        this.win(this.currentPlayer, cell);

        if (this.currentPlayer === player1) {
          this.currentPlayer = this.player2;
        } else {
          this.currentPlayer = this.player1;
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

// playButton.addEventListener("click", () => {
//   console.log("Hello");

//   player1 = new Player(player1Input.value, "X");
//   player2 = new Player(player2Input.value, "O");
//   // roundOne.play();
// });

resetButton.addEventListener("click", () => {
  roundOne.newGame();
  modal.classList.remove("display");
  overlay.classList.remove("overlay-display");
  player1Display.classList.add("selected");
  player2Display.classList.remove("selected");
});
