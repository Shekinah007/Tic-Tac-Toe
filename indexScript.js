const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const vsCPU = document.querySelector(".vsCPU");

const playButton = document.querySelector(".play");

let selected = false;

vsCPU.addEventListener("click", () => {
  if (!selected) {
    vsCPU.classList.add("cpuSelect");
    player2Input.value = "Roboto The Robot";
    player2Input.classList.add("inputCPU");

    selected = !selected;
  } else {
    vsCPU.classList.remove("cpuSelect");
    player2Input.value = "Player 2";
    player2Input.classList.remove("inputCPU");

    selected = !selected;
  }
});

player2Input.onchange = () => {
  if (player2Input.value != "Roboto The Robot") {
    vsCPU.classList.remove("cpuSelect");
    player2Input.classList.remove("inputCPU");
  }
};

class Player {
  constructor(name, playerSide) {
    this.name = name;
    this.playerSide = playerSide;
  }
  setName(nameChange) {
    this.name = nameChange;
  }
}

console.log(player2Input);

let player1 = new Player("Player 1", "X");
let player2 = new Player("Player 2", "O");

playButton.addEventListener("click", () => {
  player1 = new Player(player1Input.value, "X");
  player2 = new Player(player2Input.value, "O");

  if (player1Input.value == "") {
    player1.name = " Player 1";
  }
  if (player2Input.value == "") {
    player2.name = " Player 2";
  }

  localStorage.setItem("playerOne", player1.name);
  localStorage.setItem("playerTwo", player2.name);
});

export const playerOne = player1;
export const playerTwo = player2;
