const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

// const userInput = prompt.question("Please guess a letter: ");
// console.log(userInput);

// ---------------------------------- //
// FUNCTIONS
// ---------------------------------- //

const randomWord = () => wordBank[Math.floor(Math.random() * wordBank.length)];

const newRound = () => {
  const word = randomWord();
  const wordArray = word.split("");

  let hiddenWord = "";
  for (let letter in wordArray) {
    hiddenWord += " __ ";
  }

  let gallows = `
     _______
     |/    |
     |    ( ) 
     |    /|\\
     |     |
     |    / \\
  ___|___
  `;

  let correctGuesses = [];
  let incorrectGuesses = [];

  const updateGallows = () => {
    console.log(gallows);
  };

  const updateHiddenWord = () => {
    hiddenWord = "";
    wordArray.forEach((ltr) => {
      correctGuesses.includes(ltr)
        ? (hiddenWord += ` ${ltr} `)
        : (hiddenWord += " __ ");
    });
  };

  const guess = () => {
    const userInput = prompt.question("Please guess a letter: ");
    let letter;

    if (/[a-zA-Z]/.test(userInput)) {
      letter = userInput.toLowerCase();
    } else if (/[^a-zA-Z]/.test(userInput)) {
      // Do something here
      console.log("This is NOT a letter");
      guess();
    }

    if (
      correctGuesses.indexOf(letter) > -1 ||
      incorrectGuesses.indexOf(letter) > -1
    ) {
      console.log(
        "You have already entered this letter. Please enter another."
      );
      guess();
    } else if (word.includes(letter)) {
      correctGuesses.push(letter);
      console.log(correctGuesses);
      // player wins if every letter in wordArray is found in correctGuesses
      if (wordArray.every((ltr) => correctGuesses.includes(ltr))) {
        console.log("You win!!!");
        newRound();
      }
      updateHiddenWord();
      updateGallows();
      console.log(hiddenWord);
      guess();
    } else {
      incorrectGuesses.push(letter);
      console.log(incorrectGuesses);
      if (incorrectGuesses.length < 6) {
        console.log("Incorrect. Try again!");
        updateGallows();
        console.log(hiddenWord);
        guess();
      } else {
        console.log("Sorry, you lose :(");
      }
    }

    updateGallows();
  };

  updateGallows();
  console.log(hiddenWord);
  console.log(wordArray);

  guess();
};

// ---------------------------------- //
// GAME FLOW
// ---------------------------------- //

let roundNumber = 0;
let totalWins = 0;

console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");

if (!roundNumber) {
  // prompt.keyInYN("Would you like to start a new game?");
  // prompt.keyInYN("Are you sure you want to exit?");
  newRound();
} else {
  console.log(`You've won ${totalWins} out of ${roundNumber} rounds.`);
  newRound();
}
