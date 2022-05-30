const keyboard = document.querySelector("#keyboard");
const keyboardLetters = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
];

const listElements = [];
const myAnswer = [];
const secretWord = ["p", "l", "a", "t", "z", "i"];
let positions = [];

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
  if (myAnswer.length === 6) {
    if (myAnswer.join("") === secretWord.join("")) {
      console.log("Hey ganaste un oso de peluche");
    } else {
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
      console.log(positions);
    }
  } else {
    alert(`Hey, tu respuesta tiene solo ${myAnswer.length} caracteres`);
  }
};

const deleteLetter = () => {
  if (myAnswer.length === 0) {
    alert("Hey no tienes nada escrito");
  }
  myAnswer.pop();
  console.log(myAnswer);
};

const pressLetter = () => {
  const button = event.target;
  if (myAnswer.length < 6) {
    myAnswer.push(button.id);
    console.log(myAnswer);
  } else {
    alert("Hey, tu palabra ya está completo");
  }
};
