const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', (line) => {
    if (line.toLowerCase() == "make") {
        let obj = new Object(); //the resulting JSON

        fs.readFile('./cleanwords.txt', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }

            make(data, obj);
        });
    }
});

function make(words, obj) { //main function
    let prev = obj;

    for (let i = 0; i < words.length; i++) {
        let char = words.charAt(i);
        let nextChar = words.charAt(i + 1);

        if ((char == "\r") || (char == "\n")) {
            prev = obj;
        } else {
            if (prev[char] === undefined) {
                if ((nextChar == "\r") || (nextChar == "\n") || (nextChar.length == 0)) {
                    prev[char] = new Object();
                    prev[char].end = "end";
                } else {
                    prev[char] = new Object();
                    prev = prev[char];
                }
            } else {
                prev = prev[char];
            }
        }

        if (i == (words.length - 1)) { //done looping
            fs.writeFile('./treewords.json', JSON.stringify(obj), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("saved");
                }
            });
        }
    }
}