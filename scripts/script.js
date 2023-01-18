//fetching words from json file and setting it to wordsList
fetch('./scripts/words.json')
    .then((response) => response.json())
    .then((json) => init(json['words']));

let wordsList, wordsListLength, wordDisplay;
let currWord = "";
let enteredLettersStr = "";
let rolledWordNums = new Set();
let enteredLetters = new Set();
let guesses = 0;
let inPlay = false;

const lettersArr = [
                        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
                        ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q'],
                        ['r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
                    ];

const word_rr = document.getElementById('word-rr');
const word_space = document.getElementById('word-space');
word_rr.addEventListener("click", reroll);

const inputBox = document.getElementById('input-box');
const enteredLettersCont = document.getElementById('entered-letters-cont');
inputBox.addEventListener('input', enterLetter);

const statusBox = document.getElementById('status-box');
const mainImg = document.getElementById('main-img');

displayInput();


function init(words){
    wordsList = words;
    wordsListLength = Object.keys(wordsList).length-1;
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
    
function enterLetter(e){
    if (inPlay) {
        if (isLetter(e.target.value.toLowerCase())){
            if (enteredLetters.has(e.target.value.toLowerCase())){
            console.log(e.target.value.toLowerCase() + ' already input');
            }
            else{
                enteredLetters.add(e.target.value.toLowerCase());
                enteredLettersStr += e.target.value.toLowerCase();
                //enteredLettersBox.textContent = enteredLettersStr;
                fillDisplay(e.target.value.toLowerCase());
            }
        }
    }
    inputBox.value = '';
}

function reroll(){
    word_rr.textContent = "reroll word";
    let dupe = true;
    let roll = Math.floor(Math.random() * wordsListLength);
    inPlay = true;
    displayInput();
    while (dupe){
        if (rolledWordNums.has(roll)){
            roll = Math.floor(Math.random() * wordsListLength);
        }
        else{
            rolledWordNums.add(roll);
            currWord = wordsList[roll];
            dupe = false;
            console.log(currWord);
        }
    }
    wordDisplay = "_".repeat(currWord.length);
    word_space.textContent=wordDisplay;
    reset();
}

function fillDisplay(letter){
    let inputLetter = document.getElementById(letter);
    if(currWord.match(letter)){
        inputLetter.classList.add('letter-correct');
        for(let i = 0; i < currWord.length; i++){
            if(currWord.charAt(i) === letter){
                wordDisplay = setCharAt(wordDisplay, i, letter);
                word_space.textContent=wordDisplay;
            }
        }
        console.log("word contains " + letter);
    }
    else{
        inputLetter.classList.add('letter-incorrect');
        guesses += 1;
        if (guesses >= 8){
            inPlay = false;
            displayInput();
            mainImg.src = "./img/guess_final.jpg";
            let tempElem = document.createElement('p');
            tempElem.textContent = "out of LIVES! the word is"
            statusBox.appendChild(tempElem);
            tempElem = document.createElement('p');
            tempElem.textContent = currWord;
            tempElem.setAttribute('id', 'word-reveal');
            statusBox.append(tempElem);
        }
        else{
            mainImg.src = "./img/guess_" + guesses + ".jpg";
        }
        
        console.log('no match');
    }
    if (wordDisplay === currWord){
        let tempElem = document.createElement('p');
        tempElem.textContent = "congratz u got the word!"
        statusBox.appendChild(tempElem);
        inPlay = false;
        displayInput();
    }
}

function setCharAt(str,index,chr){
    if (index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function reset(){
    const emptySet = new Set();
    enteredLetters = emptySet;
    enteredLettersStr = "";
    enteredLettersCont.textContent = '';
    generateEnteredLettersCont();
    statusBox.textContent = "";
    guesses = 0;
    mainImg.src = "./img/guess_0.jpg";
}

function displayInput(){
    if(inPlay) inputBox.style.visibility = "visible";
    else inputBox.style.visibility = "hidden";
}

function generateEnteredLettersCont(){
    for (let i = 0; i < lettersArr.length; i++){
        let letterRow = document.createElement('div');
        letterRow.classList.add('letter-row-cont');
        for (let j = 0 ; j < lettersArr[i].length; j++){
            let tempLetter = document.createElement('span');
            tempLetter.classList.add('letter');
            tempLetter.setAttribute('id', lettersArr[i][j]);
            tempLetter.textContent = lettersArr[i][j].toUpperCase();
            letterRow.appendChild(tempLetter);
        }
        enteredLettersCont.appendChild(letterRow);
    }
}