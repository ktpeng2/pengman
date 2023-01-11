
fetch('./scripts/words.json')
    .then((response) => response.json())
    .then((json) => init(json['words']));

let wordsList, wordsListLength, wordDisplay;
let rolledWordNums = new Set();

let currWord = "";
const word_rr = document.getElementById('word-rr');
const word_space = document.getElementById('word-space');
word_rr.addEventListener("click", reroll);

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

let inputLetters = new Set();

str = "";
const input = document.querySelector('input');
const log = document.getElementById('da-box');
    
input.addEventListener('input', updateValue);
    
function updateValue(e){
    if (isLetter(e.target.value.toLowerCase())){
        if (inputLetters.has(e.target.value.toLowerCase())){
        console.log(e.target.value.toLowerCase() + ' already input');
        }
        else{
            inputLetters.add(e.target.value.toLowerCase());
            str += e.target.value.toLowerCase();
            log.textContent = str;
            fillDisplay(e.target.value.toLowerCase());
        }
    }
    input.value = '';
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

function init(words){
    let usedWords = new Set();
    wordsList = words;
    wordsListLength = Object.keys(wordsList).length-1;
    //refernce words by words[#]
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
    inputLetters = emptySet;
    str = "";
    log.textContent = str;
    
}