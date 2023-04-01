const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia"; // Temporary. Will be replaced with a random word from the array below.
let guessedLetters = []; // Empty array to store the player's guessed letters.
let remainingGuesses = 8; // Variable to store the number of remaining guesses.

const getWord = async function () { // Function to get a random word from the array below
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"); // Fetch the words from the URL
    const words = await response.text(); // Convert the response to text
    const wordArray = words.split("\n"); // Split the text into an array of words
    const randomIndex = Math.floor(Math.random() * wordArray.length); // Generate a random number between 0 and the length of the wordArray
    word = wordArray[randomIndex].trim(); // Store the random word in the word variable
    placeholder(word); // Call the placeholder function and pass the word variable as an argument
}; // End of getWord function 

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) { // Function to create placeholders for each letter in the word
    const placeholderLetters = []; // Empty array to store the placeholders
    for (const letter of word) { // Loop through each letter in the word
        console.log(letter); // Log each letter to the console
        placeholderLetters.push("●"); // Push a placeholder symbol for each letter into the placeholderLetters array
    } // End of for loop
    wordInProgress.innerText = placeholderLetters.join(""); // Join the placeholder symbols together and display them in the wordInProgress paragraph
} // End of placeholder function

getWord(); // Call the getWord function

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
        showGuessedLetters(); // Call the showGuessedLetters function
        updateGuessesRemaining(guess); // Call the updateGuessesRemaining function and pass the player's guess as an argument
        updateWordInProgress(guessedLetters); // Call the updateWordInProgress function and pass the guessedLetters array as an argument
    }
};

const showGuessedLetters = function () { // Function to display the player's guessed letters
    guessedLettersElement.innerHTML = ""; // Clear the guessedLettersElement paragraph
    for (const letter of guessedLetters) { // Loop through each letter in the guessedLetters array
        const li = document.createElement("li"); // Create a list item for each letter
        li.innerText = letter; // Add the letter to the list item
        guessedLettersElement.append(li); // Add the list item to the guessedLettersElement paragraph
    }
};

const updateWordInProgress = function (guessedLetters) { // Function to update the word in progress
    const wordUpper = word.toUpperCase(); // Convert the word to uppercase
    const wordArray = wordUpper.split(""); // Split the word into an array of letters
    const revealWord = []; // Empty array to store the revealed letters
    for (const letter of wordArray) { // Loop through each letter in the wordArray
        if (guessedLetters.includes(letter)) { // Check if the letter has been guessed
            revealWord.push(letter.toUpperCase()); // If so, add the letter to the revealWord array
        } else { // If not, add a placeholder symbol to the revealWord array
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join(""); // Join the letters and symbols together and display them in the wordInProgress paragraph
    checkIfWin(); // Call the checkIfWin function
};

const updateGuessesRemaining = function (guess) { // Function to update the number of remaining guesses
    const upperWord = word.toUpperCase(); // Convert the word to uppercase 
    if (!upperWord.includes(guess)) { // Check if the word does not include the player's guess
        message.innerText = `Sorry, the word has no ${guess}.`; // If so, tell the player that the word does not include their guess
        remainingGuesses -= 1; // Subtract one from the remainingGuesses variable
    } else { // If the word does include the player's guess
      message.innerText = `Good guess! The word has the letter ${guess}.`; // Tell the player that the word does include their guess
    }

    if (remainingGuesses === 0) { // Check if the player has no guesses remaining
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`; // If so, display the losing message
        startOver(); // Call the startOver function
    } else if (remainingGuesses === 1) { // Check if the player has one guess remaining
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`; // If so, display the singular form of guess
    } else { // If the player has more than one guess remaining
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`; // Display the plural form of guesses
    }
};

const checkIfWin = function () { // Function to check if the player has won
    if (word.toUpperCase() === wordInProgress.innerText) { // Check if the word is equal to the wordInProgress paragraph
        message.classList.add("win"); // If so, add the win class to the message paragraph
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`; // Add the winning message to the message paragraph
        startOver(); // Call the startOver function
    }
};

const startOver = function () { // Function to start the game over
    guessLetterButton.classList.add("hide"); // Hide the guess letter button
    remainingGuessesElement.classList.add("hide"); // Hide the remaining guesses element
    guessedLettersElement.classList.add("hide"); // Hide the guessed letters element
    playAgainButton.classList.remove("hide"); // Show the play again button

    playAgainButton.addEventListener("click", function () { // Event listener for the play again button
        message.classList.remove("win"); // Remove the win class from the message paragraph
        message.innerText = ""; // Clear the message paragraph
        guessedLettersElement.innerHTML = ""; // Clear the guessedLettersElement paragraph
        remainingGuesses = 8; // Reset the remainingGuesses variable
        guessedLetters = []; // Reset the guessedLetters array
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`; // Reset the remaining guesses span

        getWord(); // Call the getWord function

        guessLetterButton.classList.remove("hide"); // Show the guess letter button
        remainingGuessesElement.classList.remove("hide"); // Show the remaining guesses element
        guessedLettersElement.classList.remove("hide"); // Show the guessed letters element
        playAgainButton.classList.add("hide"); // Hide the play again button
    });
};