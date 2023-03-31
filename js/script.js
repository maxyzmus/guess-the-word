const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"; // Temporary. Will be replaced with a random word from the array below.
const guessedLetters = []; // Empty array to store the player's guessed letters.

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) { // Function to create placeholders for each letter in the word
    const placeholderLetters = []; // Empty array to store the placeholders
    for (const letter of word) { // Loop through each letter in the word
        console.log(letter); // Log each letter to the console
        placeholderLetters.push("●"); // Push a placeholder symbol for each letter into the placeholderLetters array
    } // End of for loop
    wordInProgress.innerText = placeholderLetters.join(""); // Join the placeholder symbols together and display them in the wordInProgress paragraph
} // End of placeholder function

placeholder(word); // Call the placeholder function and pass the word variable as an argument

const validateInput = function (input) { // Function to validate the player's input
    const acceptedLetter = /[a-zA-Z]/; // Variable to store the accepted letter
    if (input.length === 0) {
        // Is the input empty?
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        // Did the player enter more than one letter?
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        // Did the player enter a number, a special character or some other non letter?
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        // We finally got a single letter! Let's guess!
        makeGuess(input); // Call the makeGuess function and pass the input as an argument
    }
};

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the form from submitting
    message.innerText = ""; // Clear the message paragraph
    const guess = letterInput.value; // Store the value of the player's input in a variable
    validateInput(guess); // Call the validateInput function and pass the player's input as an argument
    letterInput.value = ""; // Clear the player's input
}); // End of event listener

const makeGuess = function (guess) { // Function to make a guess
    guess = guess.toUpperCase(); // Convert the player's guess to uppercase
    if (guessedLetters.includes(guess)) { // Check if the player has already guessed this letter
        message.innerText = "You already guessed that letter. Try again."; // If so, tell them to try again
    } else { // If not, add the letter to the guessedLetters array
        guessedLetters.push(guess); // Add the player's guess to the guessedLetters array
        console.log(guessedLetters); // Log the guessedLetters array to the console
    }
}