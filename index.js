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
  let wordReveal = [];
  let correctGuesses = [];
  let incorrectGuesses = [];

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
      guess();
    } else {
      incorrectGuesses.push(letter);
      console.log(incorrectGuesses);
      if (incorrectGuesses.length < 6) {
        console.log("Incorrect. Try again!");
        guess();
      } else {
        console.log("Sorry, you lose :(");
      }
    }

    // Lose Scenario

    // Win Scenario
  };

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
