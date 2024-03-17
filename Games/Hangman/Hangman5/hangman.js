const wordSection = document.querySelector(".word-section");
const attemptSection = document.querySelector(".guesses-section b");
const keys = document.querySelector(".keys");
const hangman = document.querySelector(".hangman-box img");
const game = document.querySelector(".game");
const play = game.querySelector("button");

// Initializing game variables
let currentWord, rightLetters, wrongGuess;
const guesses = 6;

const resetHangman = () => {
    // Ressetting game variables and UI elements
    rightLetters = [];
    wrongGuess = 0;
    hangman.src = "../images/hangman-0.svg";
    attemptSection.innerText = `${wrongGuess} / ${guesses}`;
    wordSection.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keys.querySelectorAll("button").forEach(btn => btn.disabled = false);
    game.classList.remove("show");
}

const randomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // Making currentWord as random word
    document.querySelector(".hint-text b").innerText = hint;
    resetHangman();
}

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    game.querySelector("img").src = `../images/${isVictory ? 'snake-yas' : 'crying-snake'}.gif`;
    game.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    game.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    game.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                rightLetters.push(letter);
                wordSection.querySelectorAll("li")[index].innerText = letter;
                wordSection.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuess and hangman image
        wrongGuess++;
        hangman.src = `../images/hangman-${wrongGuess}.svg`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    attemptSection.innerText = `${wrongGuess} / ${guesses}`;

    // Calling gameOver function if any of these condition meets
    if(wrongGuess === guesses) return gameOver(false);
    if(rightLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keys.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

randomWord();
play.addEventListener("click", randomWord);