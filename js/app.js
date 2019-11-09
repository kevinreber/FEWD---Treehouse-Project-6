const qwerty = document.getElementById('qwerty');
const keyboard = document.querySelectorAll('#qwerty button');
const phrase = document.getElementById('phrase');
const ul = document.querySelector('#phrase ul');
const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');
const gameButton = document.querySelector('#overlay a');
const hearts = document.querySelectorAll('img');
const phrases = [
    "Knuckle Down",
    "Should Have Could Have",
    "Lovey Dovey",
    "Fight Club",
    "Gotta Catch em All",
    "Break The Ice",
    "Down For The Count",
    "Fit as a Fiddle",
    "Would Harm a Fly",
    "Back To the Drawing Board",
    "Shot In the Dark",
    "Cut The Mustard",
    "Jig Is Up",
    "Party like a Rockstar",
    "Doses and Mimosas"
];
let missed = 0;


//This event hides overlay when startButton is clicked
overlay.addEventListener('click', (e) => {
    if (event.target.className === 'game-button') {
        overlay.style.display = 'none';
        overlay.classList.remove('start');
    }
    addPhraseToDisplay(phrases);
});

//This function randomly selects a phrase from the phrases array
function getRandomPhraseAsArray(arr) {
    let randomNum = Math.random();
    let numberOfPhrases = arr.length;
    let selectedPhrase = arr[Math.floor(randomNum * numberOfPhrases)];
    let characters = selectedPhrase.split('');
    return characters;
}

//This function adds the selected random phrase to the game screen
function addPhraseToDisplay(randomPhrase) {
    const phraseArray = getRandomPhraseAsArray(randomPhrase);

    for (let i = 0; i < phraseArray.length; i++) {
        let character = phraseArray[i].toLowerCase();
        //create li item to display
        let listItem = document.createElement('li');
        //add texContent into listItem
        listItem.textContent = character;

        ul.appendChild(listItem);

        if (listItem.textContent !== ' ') {
            listItem.className = 'letter';
        } else {
            listItem.className = 'space';
        }
    }
}

function checkLetter(userInput) {
    const letterClass = document.getElementsByClassName('letter');
    let matched = null;
    for (i = 0; i < letterClass.length; i++) {
        if (letterClass[i].textContent === userInput.toLowerCase()) {
            letterClass[i].classList.add('show');
            matched = true;
        }
    }
    return matched;
}

qwerty.addEventListener('click', (e) => {
    const buttonSelected = e.target;
    //if type is a button
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

function compareUserInput(userInput) {
    userInput.classList.add('chosen');
    userInput.setAttribute('disabled', true);
    let letterFound = checkLetter(userInput.textContent);
    if (letterFound === null) {
        removeHeart();
    }
    checkWin();
}

function removeHeart() {
    let heart = hearts[missed];
    heart.setAttribute('src', 'images/lostHeart.png');
    missed++;
}

function resetHeart() {
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].setAttribute('src', 'images/liveHeart.png')
        missed = 0;
    }
}

function checkWin() {
    const phraseLetters = document.getElementsByClassName('show');
    const listLetters = document.getElementsByClassName('letter');

    if (missed === 5) {
        results('lose', 'YOU LOSE!')
    } else if (phraseLetters.length === listLetters.length) {
        results('win', 'YOU WIN!');
    }
}

function results(result, screenText) {
    overlay.style.display = '';
    overlay.classList.add(result);
    title.textContent = screenText;
    resetGame(result);
}

function resetGame(gameResult) {
    gameButton.textContent = 'Play Again?';
    let letters = document.querySelectorAll('ul li');

    gameButton.addEventListener('click', () => {
        overlay.classList.remove(gameResult);

        //Trying to remove existing li elements
        // for (let i = 0; i < ul.length; i++) {
        //     ul[i].remove();
            // console.log(ul.length);
            // console.log(ul.firstElementChild);
        // }
        letters.remove();

        for (let i = 0; i < keyboard.length; i++) {
            keyboard[i].classList.remove('chosen');
            keyboard[i].setAttribute('disabled', false);
        }

        addPhraseToDisplay(phrases);
        resetHeart();
    });
}