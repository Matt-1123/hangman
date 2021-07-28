const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

const userInput = prompt.question("Please guess a letter: ");

console.log(userInput)