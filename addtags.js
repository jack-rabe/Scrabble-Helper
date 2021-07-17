function addTags() {
    const centerTile = 112;
    const tripleWordTiles = [0, 7, 14, 210, 217, 224];
    const tripleLetterTiles = [20, 24, 76, 80, 84, 88, 136, 140, 144, 148, 200, 204];
    const doubleWordTiles = [16, 28, 32, 42, 48, 56, 64, 70, 154, 160, 176, 168, 172, 182, 192, 196, 208];
    const doubleLetterTiles = [3, 11, 36, 38, 45, 52, 59, 92, 96, 98, 102, 108, 116, 122, 126, 128, 132, 172, 179, 186, 165, 188, 213, 221];

    let color = "";
    for (let i = 0; i < 225; i++) {
        if (tripleWordTiles.indexOf(i) !== -1) { color = "red" }
        else if (tripleLetterTiles.indexOf(i) !== -1) { color = "green"; }
        else if (doubleLetterTiles.indexOf(i) !== -1) { color = "yellow"; }
        else if (doubleWordTiles.indexOf(i) !== -1) { color = "pink;"; }
        else if (i === centerTile) { color = "orange"; }
        else { color = "white"; }

        addBoardTile(color, i)
    }

    let pointReferenceLeft = document.getElementsByClassName("point-reference")[0];
    let pointReferenceRight = document.getElementsByClassName("point-reference")[1];
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const points = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
    let newTagLeft;
    let newTagRight;
    let currentIndex;

    for (let i = 0; i < 26; i++){
        newTagLeft = document.createElement('p');
        newTagRight = document.createElement('p');
        currentIndex = Math.floor(i / 2)

        if (i % 2 === 0){
            newTagLeft.textContent = letters[currentIndex];
            newTagRight.textContent = letters[currentIndex + 13];
        }
        else {
            newTagLeft.textContent = points[currentIndex];
            newTagRight.textContent = points[currentIndex + 13];
        }

        pointReferenceLeft.appendChild(newTagLeft)
        pointReferenceRight.appendChild(newTagRight);
    }

}

// only allows a single letter to be typed into each grid square
function checkForOneLetter(id) {
    let element = document.getElementById(id);
    if (element) {
        element.value = element.value.charAt(element.value.length - 1);
    }
}

// adds a single tile to the board with the appropriate color and id number
function addBoardTile(color, index) {
    const board = document.getElementById("scrabble-board");
    const newTag = document.createElement('input');
        newTag.style.backgroundColor = color;
        newTag.id = index;
        newTag.type = index;
        newTag.tabIndex = 1;
        newTag.oninput = () => {
            checkForOneLetter(index);
        }
        board.appendChild(newTag);
}