const keyboard = document.querySelector("#keyboard");
const grid = document.querySelector("#grid");
const keyboardLetters = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
];

const listElements = [];
let myAnswer = [];
let secretWord = ["p", "l", "a", "t", "z", "i"];

let positions = [];
let attempts = 0;

const rows = [];
for (let row = 0; row < 5; row++) {
  const list = document.createElement("ul");
  list.classList.add("grid-row");
  for (let column = 0; column < 6; column++) {
    const listItem = document.createElement("li");
    listItem.classList.add("row-item");
    listItem.id = `${row}-${column}`;
    list.appendChild(listItem);
  }
  rows.push(list);
}

grid.append(...rows);

const fetchWord = () => {
  fetch("https://random-word-api.herokuapp.com/word?length=6")
    .then((response) => response.json())
    .then((data) => {
      secretWord = data[0].split("");
    });
};

fetchWord();

keyboardLetters.map((letters) => {
  const list = document.createElement("ul");
  letters.map((letter) => {
    const listItem = document.createElement("li");
    switch (letter) {
      case "enter":
        listItem.innerHTML = `
          <button onclick="checkWord()" id=${letter}>${letter}</button>
        `;
        break;
      case "delete":
        listItem.innerHTML = `
          <button onclick="deleteLetter()" id=${letter}>${letter}</button>
        `;
        break;
      default:
        listItem.innerHTML = `
          <button onclick="pressLetter()" id=${letter}>${letter}</button>
        `;
        break;
    }
    list.appendChild(listItem);
  });
  listElements.push(list);
});

keyboard.append(...listElements);

const checkWord = () => {
  if (positions.every((position) => position === "green")) {
    alert("Ya ganaste, salte de aqui por favor");
  }
  if (attempts === 5) {
    alert("Hey ya no tienes intentos");
    return;
  }
  if (myAnswer.length === 6) {
    attempts += 1;
    for (let i = 0; i < 6; i++) {
      switch (true) {
        case myAnswer[i] === secretWord[i]:
          positions.push("green");
          break;
        case secretWord.includes(myAnswer[i]):
          positions.push("marron");
          break;
        default:
          positions.push("gray");
          break;
      }
    }
    positions.map((color, id) => {
      const item = document.getElementById(`${attempts - 1}-${id}`);
      item.classList.add(color);
    });
    myAnswer = [];
    positions = [];
  } else {
    alert(`Hey, tu respuesta tiene solo ${myAnswer.length} caracteres`);
  }
};

const deleteLetter = () => {
  if (myAnswer.length === 0) {
    alert("Hey no tienes nada escrito");
  }
  const item = document.getElementById(`${attempts}-${myAnswer.length - 1}`);
  item.textContent = "";
  myAnswer.pop();
};

const pressLetter = () => {
  const button = event.target;
  if (myAnswer.length < 6) {
    const currentItem = document.getElementById(
      `${attempts}-${myAnswer.length}`
    );
    currentItem.textContent = button.textContent;
    myAnswer.push(button.id);
  } else {
    alert("Hey, tu palabra ya está completa");
  }
};

const reset = () => {
  event.target.disabled = true;
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 6; column++) {
      const item = document.getElementById(`${row}-${column}`);
      item.textContent = "";
      item.classList.remove("green");
      item.classList.remove("marron");
      item.classList.remove("gray");
    }
  }
  attempts = 0;
};
