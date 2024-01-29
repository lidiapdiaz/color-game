"use strict";

//When the page loads we execute starGame();
window.addEventListener("load", startGame);

function startGame() {
  //We set the counter at 0 to start the game!
  let pointWin = 0;
  let pointLose = 0;

  //Call the points counter, necesary for set counter to 0 in the beginning of the game
  counter(pointWin, pointLose);

  //Calls the function that generates RGB Code
  createCodeRGB();
}

//Generate random RGB Code
function createCodeRGB() {
  //random number between 0 - 255, one for each channel color (R, G, B)
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  //We find HTML Tag to write the question to guess
  const RGBCode = document.getElementById("RGBCode");
  //We print the RGB code (question)
  RGBCode.textContent = `${r}, ${g}, ${b}`;

  //Calls the function that creates colors (answers) to paint the boxes and pass r g b values
  getRandomColors(r, g, b);
}

function getRandomColors(r, g, b) {
  //we create the correct color (the answer that would be correct) and its variations
  const colorOK = `rgb(${r}, ${g}, ${b})`;

  //Instead of generating random values, we add or subtract them so that they look similar
  // with %256 we make sure that the number it will be 0 to 255
  const colorAlt1 = `rgb(${(r + 30) % 256}, ${(g - 20) % 256}, ${
    (b + 10) % 256
  })`;
  const colorAlt2 = `rgb(${(r - 10) % 256}, ${(g + 20) % 256}, ${
    (b - 30) % 256
  })`;

  //We pass the generated colors as arguments and call the function that colors the boxes
  createColors(colorOK, colorAlt1, colorAlt2);
}

//We identify where paint the colors
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");

function createColors(colorOK, colorAlt1, colorAlt2) {
  //Array with all colors for shuffle
  const colors = [colorOK, colorAlt1, colorAlt2];

  //We mess with the sort function,
  colors.sort(() => Math.random() - 0.5); // -0.5 generates a positive or negative number

  box1.style.backgroundColor = colors[0];
  box2.style.backgroundColor = colors[1];
  box3.style.backgroundColor = colors[2];

  //We call the function and we pass on it the correct answer
  checkAnswer(colorOK);
}

function checkAnswer(colorOK) {
  //We save the score in localStorage
  let pointWin = localStorage.win;
  let pointLose = localStorage.lose;

  //When we click, checks if it is correct. If it is, add +1 to successes and if not, add +1 to fails.
  box1.addEventListener("click", () => {
    box1.style.backgroundColor === colorOK ? pointWin++ : pointLose++;
    //We call function to save the successes and failures on the scoreboard
    counter(pointWin, pointLose);
  });

  box2.addEventListener("click", () => {
    box2.style.backgroundColor === colorOK ? pointWin++ : pointLose++;
    counter(pointWin, pointLose);
  });

  box3.addEventListener("click", () => {
    box3.style.backgroundColor == colorOK ? pointWin++ : pointLose++;
    counter(pointWin, pointLose);
  });

  //To finish the game there must be 3 wins or 3 losses
  function gameOver() {
    if (pointWin >= 3) {
      alert("YOU WIN");
      startGame();
    }
    if (pointLose >= 3) {
      alert("YOU LOSE");
      startGame();
    }
  }

  gameOver();
}

function counter(pointWin, pointLose) {
  //We find HTML Tag to write the scores
  const counterWin = document.getElementById("right");
  const counterLose = document.getElementById("wrong");

  //We save the score in localStorage
  let localwin = localStorage.setItem("win", pointWin);
  let locallose = localStorage.setItem("lose", pointLose);

  //We write the saved points in localStorage
  counterWin.textContent = localStorage.win;
  counterLose.textContent = localStorage.lose;

  window.addEventListener("click", createCodeRGB);
}
