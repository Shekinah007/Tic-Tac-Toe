// import { playerOne } from "./indexScript.js";

const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");

const body = document.querySelector("body");
const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector(".reset");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalMessage = document.querySelector(".message");
const playButton = document.querySelector(".play");
const player1Display = document.querySelector(".player1");
const player2Display = document.querySelector(".player2");
const restartButton = document.querySelector(".restart");
const quit1Button = document.querySelector(".home1");
const close = document.querySelector(".close");

close.addEventListener("click", () => {
  modal.classList.remove("display");
  overlay.classList.remove("overlay-display");
  quit1Button.style.display = "block";
  restartButton.style.display = "block";
});

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
    this.cpuOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
      modal.classList.add("display");
      overlay.classList.add("overlay-display");
      modalMessage.innerText = this.currentPlayer.name + "  Wins!";
      quit1Button.style.display = "none";
      restartButton.style.display = "none";
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
      quit1Button.style.display = "none";
      restartButton.style.display = "none";
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

  cpuPlay() {
    if (this.winState == "true" || this.winState == "draw") {
      console.log("CPU WINS");
      return;
    }

    let randomIndex = Math.ceil(Math.random() * this.boardTrack.length - 1);

    console.log("CPU: ", randomIndex);
    console.log("Cpu Current Player: ", this.currentPlayer);
    cells.forEach((cell, index) => {
      if (index == randomIndex) {
        console.log("This is it! ", index);
        if (cell.innerText != "") {
          this.cpuPlay();
        } else {
          console.log("top");
          cell.innerText = this.currentPlayer.playerSide;
          this.updateGameState(index, this.currentPlayer);
          this.win(this.currentPlayer, cell);
          if (this.winState == "true" || this.winState == "draw") {
            console.log("Cpu Win State");
            return;
          }
          console.log("Bottom");
          player1Display.classList.toggle("selected");
          player2Display.classList.toggle("selected");
          this.currentPlayer = this.player1;
        }
      }
    });
  }

  vsCPUPlay() {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (cell.innerText != "") {
          alert("That position is already occupied!");
          return;
        }
        if (this.winState == "true" || this.winState == "draw") return;

        player1Display.classList.toggle("selected");
        player2Display.classList.toggle("selected");

        this.updateGameState(index, this.currentPlayer);
        cell.innerText = this.currentPlayer.playerSide;
        this.win(this.currentPlayer, cell);

        console.log("Player Current Player: ", this.currentPlayer);
        this.currentPlayer = player2;

        this.nextTurn();
      });
    });
  }

  nextTurn() {
    if (this.winState == "true" || this.winState == "draw") {
      console.log("Win State");
      return;
    }
    if (this.currentPlayer === player1) {
      this.vsCPUPlay();
    } else if (this.currentPlayer === player2) {
      setTimeout(() => {
        this.cpuPlay();
      }, 500);
      console.log("This is Player 2");
    }
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
    for (let i = 0; i < this.cpuOptions.length; i++) {
      if (i == index) {
        this.cpuOptions.splice(i, 1);
      }
    }
    console.log(this.boardTrack);
    console.log("CPU Options: ", this.cpuOptions);
  }
}

// playButton.addEventListener("click", () => {
//   console.log("Hello");

//   player1 = new Player(player1Input.value, "X");
//   player2 = new Player(player2Input.value, "O");
//   // roundOne.play();
// });

function resetGame() {
  roundOne.newGame();
  modal.classList.remove("display");
  overlay.classList.remove("overlay-display");
  player1Display.classList.add("selected");
  player2Display.classList.remove("selected");
}

resetButton.addEventListener("click", () => {
  resetGame();
  modal.classList.remove("display");
  overlay.classList.remove("overlay-display");
  quit1Button.style.display = "grid";
  restartButton.style.display = "grid";
});

restartButton.addEventListener("click", () => {
  resetGame();
});

let roundOne = new GameState(player1, player2);

if (player2.name == "Roboto The Robot") {
  roundOne.vsCPUPlay();
} else {
  roundOne.play();
}
