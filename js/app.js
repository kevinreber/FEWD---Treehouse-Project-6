const qwerty = document.getElementById('qwerty');
const keyboard = document.querySelectorAll('#qwerty button');
const phrase = document.getElementById('phrase');
const ul = document.getElementById('phrase-list');
const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');
const gameButton = document.querySelector('.game-button');
const hearts = document.querySelectorAll('img');
const header = document.querySelector('.header');
const phrases = [
    "Knuckle Down",
    "I Will Be Back",
    "Lovey Duvy",
    "Fight Club",
    "Gotta Catch em All",
    "Break The Ice",
    "Down For The Count",
    "Pumping Iron",
    "Would Not Harm a Fly",
    "Wander More",
    "Eloquent Javascript",
    "I Like Turtles",
    "The Jig Is Up",
    "Party like a Rockstar",
    "Doses and Mimosas"
];
let lives;

//<------------- EVENT LISTENERS ------------->//
//This event hides overlay when startButton is clicked
overlay.addEventListener('click', startGame);

qwerty.addEventListener('click', (e) => {
    const buttonSelected = e.target;
    if (buttonSelected.tagName === 'BUTTON') {
        compareUserInput(buttonSelected);
    }
});

//This event listens when the user's keyboard is pressed
document.addEventListener('keydown', (e) => {
    const keyPressed = e.key;
    for (let i = 0; i < keyboard.length; i++) {
        let buttonText = keyboard[i].textContent;
        if (keyPressed === buttonText) {
            compareUserInput(keyboard[i]);
        }
    }
});

//<---------------- FUNCTIONS ---------------->//
function clearGame() {
    ul.innerHTML = '';
    lives = 5;
    keyboard.forEach(key => {
        key.className = '';
        key.removeAttribute('disabled');
    });

    hearts.forEach(heart => {
        heart.setAttribute('src', 'images/liveHeart.png')
    });
}

function startGame() {
    clearGame();
    if (event.target.className === 'game-button') {
        overlay.className = '';
        overlay.style.display = 'none';
        overlay.classList.remove('start')
        header.style.animation = 'float 3s linear infinite';
    }
    addPhraseToDisplay(phrases);
}

//This function randomly selects a phrase from the phrases array
function getRandomPhraseAsArray(arr) {
    let randomNum = Math.random();
    let numberOfPhrases = arr.length;
    let selectedPhrase = arr[Math.floor(randomNum * numberOfPhrases)];
    let characters = [...selectedPhrase];
    return characters;
}

//This function adds the selected random phrase to the game screen
function addPhraseToDisplay(randomPhrase) {
    const phraseArray = getRandomPhraseAsArray(randomPhrase);
    phraseArray.map(char => {
        char = char.toLowerCase();
        let listItem = document.createElement('li'); //create li item to display
        listItem.textContent = char; //add texContent into listItem
        ul.appendChild(listItem);

        if (listItem.textContent !== ' ') {
            listItem.className = 'letter';
        } else {
            listItem.className = 'space';
        }
    });
}

function checkLetter(userInput) {
    const letterClass = document.getElementsByClassName('letter');
    let matched = null;
    for (let letter of letterClass) {
        if (letter.textContent === userInput.toLowerCase()) {
            letter.classList.add('show');
            matched = true;
        }
    }
    return matched;
}

function compareUserInput(userInput) {
    userInput.setAttribute('disabled', true);
    let letterFound = checkLetter(userInput.textContent);
    if (letterFound) {
        userInput.classList.add('correct');
    }
    if (letterFound === null) {
        userInput.classList.add('wrong');
        removeHeart();
    }
    checkWin();
}

function removeHeart() {
    let heart = hearts[lives - 1];
    heart.setAttribute('src', 'images/lostHeart.png');
    lives--;
}

function checkWin() {
    const phraseLetters = document.getElementsByClassName('show');
    const listLetters = document.getElementsByClassName('letter');
    gameButton.textContent = 'Play Again?';
    if (lives === 0) {
        results('lose', 'YOU LOSE!')
    } else if (phraseLetters.length === listLetters.length) {
        results('win', 'YOU WIN!');
    }
}

function results(result, screenText) {
    overlay.style.display = '';
    overlay.classList.add(result);
    title.textContent = screenText;
    startGame();
}