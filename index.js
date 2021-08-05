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
  // New round welcome text
  console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");
  if (roundNumber === 1) {
    console.log(`Round number: ${roundNumber}`);
  } else {
    console.log(`
    Round number: ${roundNumber}
    You've won ${totalWins} out of ${roundNumber - 1} rounds.
    `);
  }

  // Generate a random word and display hidden word under gallows
  const word = randomWord();
  const wordArray = word.split("");

  // Display this round's word as blanks
  let hiddenWord = "";
  for (let letter in wordArray) {
    hiddenWord += " __ ";
  }

  // Initialize empty arrays for correct and incorrect guesses
  let correctGuesses = [];
  let incorrectGuesses = [];

  // This function uses the gallows object to update the gallows display to the console
  const updateGallows = () => {
    console.log(gallows[incorrectGuesses.length]);
  };

  // When invoked, this function iterates through the correctGuesses array and updates the hidden word display with either a correctly guessed letter or a blank
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
      console.log("Not a letter");
      guess();
    }

    /* 
    Check if the letter the player guessed has already been guessed.
    If not, then on a correct guess, add that letter to the correctGuesses array, then check if the player has won (every letter in wordArray is found in correctGuesses). If so, update the round number and total wins, then start a new round.
    On a correct guess where the player has not won yet, update the hidden word and then reset the 'screen' and provide a new guess prompt
    On an incorrect guess, add the guessed letter to the incorrectGuesses array. If this is the sixth guess, the player loses - show the final gallows image and reveal the answer, then start a new round. If they haven't lost, tell them their guess is incorrect then reset the 'screen' and provide a new guess prompt.
    */
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
        console.log(`Sorry, you lose. The word was ${word.toUpperCase()}.`);
        roundNumber++;
        newRound();
      }
    }

    updateGallows();
  };

  // Start of new round initial screen:
  updateGallows();
  // TODO: remove line below:
  console.log(hiddenWord);
  console.log(wordArray);
  guess();
};

newRound();
