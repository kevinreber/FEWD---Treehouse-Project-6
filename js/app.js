const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ul = document.querySelector('#phrase ul');
const overlay = document.getElementById('overlay');
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
    if (event.target.className === 'btn__reset') {
        overlay.style.display = 'none';
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
        buttonSelected.classList.add('chosen');
        buttonSelected.setAttribute('disabled', true);
        let letterFound = checkLetter(buttonSelected.textContent);
        if (letterFound === null) {
            removeHeart();
        }
    }
    checkWin();
});


function removeHeart() {
    let heart = hearts[missed];
    heart.setAttribute('src', 'images/lostHeart.png');
    missed++;
}

function checkWin() {
    const phraseLetters = document.getElementsByClassName('show');
    const listLetters = document.getElementsByClassName('letter');

    if (missed === 5) {
        overlay.classList.remove('start');
        overlay.classList.add('lose');
    } else if (phraseLetters.length === listLetters.length) {
        overlay.classList.add('win');
    }
    //compare number of letters with class .show to number of letters with class .letters
    //if equal, overlay .win class and WIN textContent
}


function resetGame() {
    //remove all add classes
    //reset all scores
}













// //This listens for a keydown event to occur and logs the key that is pressed
// document.addEventListener('keydown', (e) => {
//     console.log(e.key);
// });