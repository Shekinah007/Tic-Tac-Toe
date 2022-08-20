const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const playButton = document.querySelector(".play");

class Player {
  constructor(name, playerSide) {
    this.name = name;
    this.playerSide = playerSide;
  }
}

console.log(player2Input);

let player1 = new Player("Player 1", "X");
let player2 = new Player("Player 2", "O");

playButton.addEventListener("click", () => {
  player1 = new Player(player1Input.value, "X");
  player2 = new Player(player2Input.value, "O");

  console.log(player1.name);
  console.log(player2.name);

  localStorage.setItem("playerOne", player1Input.value);
  localStorage.setItem("playerTwo", player2Input.value);
  // localStorage.getItem("lastname");
});

export const playerOne = player1;
export const playerTwo = player2;
