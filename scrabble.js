var possible = new Array();

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const points = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];

function solve() {
    let board = new Array(15);
    for (let i = 0; i < 15; i++) {
        board[i] = new Array(15);
    }
    board = getLetters(board); //fill in the letters from the user

    let hand = document.getElementById("hand").value.toLowerCase();

    let possibleWords = getPossibleWords(hand);
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

    createList("", hand, allWords);
    setTimeout(() => {
        calcPoints(possible);
    }, 2000);
}

function createList(start, otherLetters, allWords) {
    let startOfWord = start;

    for (const letter of otherLetters) {
        start = startOfWord + letter;
        let remaining = otherLetters.replace(letter, "");
        let check = checkString(start, allWords);

        if (check === true && possible.indexOf(start) == -1) { // this is a whole word contained in the list
                possible.push(start);
}
        else if (check === null) {  // no word exists with these starting characters
            return;
        }
        
        if (remaining.length != 0) {  // not a complete word, but letters still remain
            createList(start, otherLetters2, allWords);
        }
    }
}

function checkString(str, allWords) {
    let prev = allWords[str.charAt(0)];

    for (let i = 1; i < str.length; i++) {
        let char = str.charAt(i);

        if (i == (str.length - 1)) { // last letter
            return (prev[char]) && (prev[char].end);
        } 
        else { // not the last letter in the string
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
    for (let i = 0; i < array.length; i++) {
        let word = array[i];
        pointArray.push(calcWord(word));

        if (i == (array.length - 1)) {
            console.log(array);
            console.log(pointArray);
            let oldPointArray = JSON.parse(JSON.stringify(pointArray)); //deep dupe array

            pointArray = pointArray.sort((a, b) => b - a); //sort the array

            let sortedWords = sortWords(array, oldPointArray, pointArray);


            for (let j = 0; j < sortedWords.length; j++) {
                console.log(`${sortedWords[j]}: ${pointArray[j]}`);
            }
        }
    }
}

function calcWord(word) { //get point values of a word
    let totalPoints = 0;
    for (let i = 0; i < word.length; i++) {
        totalPoints += (points[(letters.indexOf(word.charAt(i)))]);

        if (i == (word.length - 1)) {
            return totalPoints;
        }
    }
    // let totalPoints = 0;
    // for (const letter of word){
    //     totalPoints += points[letters.indexOf(letter)];
    // }
    // return totalPoints;
}

function sortWords(words, oldPointArray, pointArray) {
    let sortedWords = new Array();
    console.log("hi")
    for (let i = 0; i < words.length; i++) {
        let index = oldPointArray.indexOf(pointArray[i]);

        sortedWords.push(words[index]);

        if (i == (words.length - 1)) {
            return sortedWords;
        }
    }
}