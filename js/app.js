const qwerty = document.getElementById('qwerty');
const keyboard = document.querySelectorAll('#qwerty button');
const phrase = document.getElementById('phrase');
const ul = document.querySelector('#phrase ul');
const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');
const gameButton = document.querySelector('.game-button');
const hearts = document.querySelectorAll('img');
const header = document.querySelector('.header');
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
    "Wander More",
    "Shot In the Dark",
    "I Like Turtles",
    "Jig Is Up",
    "Party like a Rockstar",
    "Doses and Mimosas"
];
let lives = 5;

//<------------- EVENT LISTENERS ------------->//
//This event hides overlay when startButton is clicked
overlay.addEventListener('click', (e) => {
    if (event.target.className === 'game-button') {
        overlay.style.display = 'none';
        overlay.classList.remove('start')
        header.style.animation = 'float 3s linear infinite';
    }
    addPhraseToDisplay(phrases);
});

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

//<---------------- FUNCTIONS ---------------->//
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

function compareUserInput(userInput) {
    
    userInput.setAttribute('disabled', true);
    let letterFound = checkLetter(userInput.textContent);
    if(letterFound){
        userInput.classList.add('correct');
    }
    if (letterFound === null) {
        userInput.classList.add('wrong');
        removeHeart();
    }
    checkWin();
}

function removeHeart() {
    let heart = hearts[lives-1];
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
    resetGame(result);
}

function resetGame(gameResult) {
    //refreshes game page
    gameButton.addEventListener('click', () => {
        location.reload(true);
    });
}