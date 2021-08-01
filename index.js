const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

// ---------------------------------- //
// GLOBAL VARIABLES
// ---------------------------------- //
let roundNumber = 1;
let totalWins = 0;

const gallows = {
  0: `
     _______
     |/    |
     |    
     |    
     |     
     |    
  ___|___
  `,
  1: `
     _______
     |/    |
     |    ( ) 
     |    
     |     
     |    
  ___|___
  `,
  2: `
     _______
     |/    |
     |    ( ) 
     |     |
     |     |
     |   
  ___|___
  `,
  3: `
     _______
     |/    |
     |    ( ) 
     |    /|
     |     |
     |    
  ___|___
  `,
  4: `
     _______
     |/    |
     |    ( ) 
     |    /|\\
     |     |
     |    
  ___|___
  `,
  5: `
     _______
     |/    |
     |    ( ) 
     |    /|\\
     |     |
     |    / 
  ___|___
  `,
  6: `
     _______
     |/    |
     |    ( ) 
     |    /|\\
     |     |
     |    / \\
  ___|___
  `,
};

// ---------------------------------- //
// FUNCTIONS
// ---------------------------------- //

const randomWord = () => wordBank[Math.floor(Math.random() * wordBank.length)];

const newRound = () => {
  console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");

  if (roundNumber === 1) {
    console.log(`Round number: ${roundNumber}`);
  } else {
    console.log(`
    Round number: ${roundNumber}
    You've won ${totalWins} out of ${roundNumber - 1} rounds.
    `);
  }

  const word = randomWord();
  const wordArray = word.split("");

  let hiddenWord = "";
  for (let letter in wordArray) {
    hiddenWord += " __ ";
  }

  // let gallows = `
  //    _______
  //    |/    |
  //    |    ( )
  //    |    /|\\
  //    |     |
  //    |    / \\
  // ___|___
  // `;

  let correctGuesses = [];
  let incorrectGuesses = [];

  const updateGallows = () => {
    console.log(gallows[incorrectGuesses.length]);
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
        roundNumber++;
        totalWins++;
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
        updateGallows();
        console.log("Sorry, you lose :(");
        roundNumber++;
        newRound();
      }
    }

    updateGallows();
  };

  updateGallows();
  console.log(hiddenWord);
  console.log(wordArray);

  guess();
};

newRound();
