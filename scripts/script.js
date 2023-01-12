//fetching words from json file and setting it to wordsList
fetch('./scripts/words.json')
    .then((response) => response.json())
    .then((json) => init(json['words']));

let wordsList, wordsListLength, wordDisplay;
let currWord = "";
let enteredLettersStr = "";
let rolledWordNums = new Set();
let enteredLetters = new Set();


const word_rr = document.getElementById('word-rr');
const word_space = document.getElementById('word-space');
word_rr.addEventListener("click", reroll);

const inputBox = document.getElementById('input-box');
const enteredLettersBox = document.getElementById('entered-letters');
inputBox.addEventListener('input', enterLetter);


function init(words){
    wordsList = words;
    wordsListLength = Object.keys(wordsList).length-1;
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
    
function enterLetter(e){
    if (isLetter(e.target.value.toLowerCase())){
        if (enteredLetters.has(e.target.value.toLowerCase())){
        console.log(e.target.value.toLowerCase() + ' already input');
        }
        else{
            enteredLetters.add(e.target.value.toLowerCase());
            enteredLettersStr += e.target.value.toLowerCase();
            enteredLettersBox.textContent = enteredLettersStr;
            fillDisplay(e.target.value.toLowerCase());
        }
    }
    inputBox.value = '';
}

function reroll(){
    let dupe = true;
    let roll = Math.floor(Math.random() * wordsListLength);
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
    if(currWord.match(letter)){
        for(let i = 0; i < currWord.length; i++){
            if(currWord.charAt(i) === letter){
                wordDisplay = setCharAt(wordDisplay, i, letter);
                updateWordDisplay();
            }
        }
        console.log("word contains " + letter);
    }
    else{
        console.log('no match');
    }
}

function setCharAt(str,index,chr){
    if (index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function updateWordDisplay(){
    word_space.textContent=wordDisplay;
}

function reset(){
    const emptySet = new Set();
    enteredLetters = emptySet;
    enteredLettersStr = "";
    enteredLettersBox.textContent = enteredLettersStr;
    
}