var possible = new Array();
var running = false;
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const points = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];

async function solve() {
    let board = new Array(15);
    for (let i = 0; i < 15; i++) {
        board[i] = new Array(15);
    }
    board = getLetters(board); //fill in the letters from the user

    let hand = document.getElementById("hand").value.toLowerCase();

    running = true;
    getPossibleWords(hand);
}

function addTopWordsToTags(sortedWordArray) {
    const bestWordTags = document.getElementsByClassName("best-words");
    for (let index = 0; index < 3; index++) {
        const tag = bestWordTags[index];
        tag.innerHTML = sortedWordArray[index];  // TODO add logic to get the actual top three words here
    }
}

function getLetters(board) {
    let i = 0;
    for (let x = 0; x < 15; x++) {
        for (let y = 0; y < 15; y++) {
            let val = document.getElementById(i).value;

            if (val.length == 0) {
                board[x][y] = "";
            } else {
                board[x][y] = val.toLowerCase();
            }

            i++;
        }
    }

    return board;
}

async function getPossibleWords(hand) {
    let allWords = getWordList();
    possible = new Array();

    let watch = document.getElementById("watch");

    if (!watch) {
        let newDiv = document.createElement("div");
        document.getElementsByTagName("body")[0].appendChild(newDiv);
        newDiv.setAttribute("id", "watch");
        newDiv.style.display = "none";
        newDiv.innerHTML = "1";
    } else {
        watch.innerHTML = "1";
    }

    createList("", hand, allWords);
}

function createList(start, otherLetters, allWords) {
    let startOfWord = start;
    let watch = document.getElementById("watch");

    for (let i = 0; i < otherLetters.length; i++) {
        const letter = otherLetters[i];
        start = startOfWord + letter;
        let remaining = otherLetters.replace(letter, "");
        let check = checkString(start, allWords);

        if (check && possible.indexOf(start) == -1) { // this is a whole word contained in the list
            possible.push(start);
        }
        else if (check === null) {  // no word exists with these starting characters
            watch.innerHTML = (parseInt(watch.innerHTML) - 1);
            checkDone();
            return;
        }

        if (remaining.length != 0) {  // not a complete word, but letters still remain
            watch.innerHTML = (parseInt(watch.innerHTML) + 1);
            createList(start, remaining, allWords);
        }
        
        if (i == (otherLetters.length - 1)) {
            watch.innerHTML = (parseInt(watch.innerHTML) - 1);
            checkDone();
        }
    }
}

function checkString(str, allWords) {
    let prev = allWords[str.charAt(0)];

    for (let i = 1; i < str.length; i++) {
        let char = str.charAt(i);

        if (i == (str.length - 1)) { //last letter
            if ((prev[char]) && (prev[char].end)) {
                return true;
            } else {
                return false;
            }
        } else { //not the last letter in the string
            if (prev[char] === undefined) {
                return null;
            } else {
                prev = prev[char];
            }
        }
    }
}

function calcPoints(array) {
    let pointArray = new Array();
    for (const word of array) {
        pointArray.push(calcWord(word));
    }
    console.log(array);
    console.log(pointArray);
    let oldPointArray = JSON.parse(JSON.stringify(pointArray)); //deep dupe array
    pointArray = pointArray.sort((a, b) => b - a); //sort the array of numbers

    let sortedWords = sortWords(array, oldPointArray, pointArray);  // sort the array of words
    return sortedWords;
}

function calcWord(word) { //get point values of a word
    let totalPoints = 0;
    for (let i = 0; i < word.length; i++) {
        totalPoints += (points[(letters.indexOf(word.charAt(i)))]);
    }
    return totalPoints;
}

function sortWords(words, oldPointArray, pointArray) {
    let sortedWords = new Array();
    for (let i = 0; i < words.length; i++) {
        let index = oldPointArray.indexOf(pointArray[i]);
        console.log(index);
        oldPointArray.splice(index, 1);
        sortedWords.push(words[index]);
    }

    return sortedWords;
}

function checkDone() {
    let watch = document.getElementById("watch");
    let num = parseInt(watch.innerHTML);

    if ((running == true) && (num == 0)) {
        running = false;
        let possible2 = calcPoints(possible);  // sort the words in descending point order
        addTopWordsToTags(possible2);
    }
};