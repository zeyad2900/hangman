let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersContainer = document.querySelector(".letters");
let arrayOfLetters = Array.from(letters);

arrayOfLetters.forEach((ele) => {
    let span = document.createElement("span");
    let spanContent = document.createTextNode(ele);
    span.appendChild(spanContent);
    span.classList = "letter-box";
    lettersContainer.appendChild(span);
});

const words = {
    programming: [
        "php",
        "javascript",
        "go",
        "scala",
        "fortran",
        "ropy",
        "mysql",
        "python",
    ],
    movies: [
        "Prestige",
        "Inception",
        "Parasite",
        "Interstellar",
        "Whiplash",
        "Memento",
        "Coco",
        "Up",
    ],
    people: [
        "Albert Einstein",
        "Hitchcock",
        "Alexander",
        "Cleopatra",
        "Mahatma Ghandi",
    ],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

let allKeys = Object.keys(words);
let randomNum = Math.floor(Math.random() * allKeys.length);
let randomCategory = allKeys[randomNum];
let values = words[randomCategory];
let randomValueNum = Math.floor(Math.random() * values.length);
let valueFromCategory = values[randomValueNum];
document.querySelector(
    ".game-info .category span"
).innerHTML = `${randomCategory}`;

let lettersAndSpaces = Array.from(valueFromCategory);

lettersAndSpaces.forEach((ele) => {
    let span = document.createElement("span");
    if (ele === " ") {
        span.classList.add("with-space");
    }
    document.querySelector(".letters-guess").appendChild(span);
});

let spans = document.querySelectorAll(".letters-guess span");
let arrayOfSpans = Array.from(spans);
let wrongAttempts = 0;
let arrayWithoutSpace = arrayOfSpans.filter((e) => {
    return e.className !== "with-space";
});
let correctAttempts = 0;

let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", function (e) {
    let theStates = false;
    if (e.target.className == "letter-box") {
        e.target.classList.add("clicked");
        lettersAndSpaces.forEach((letters, indexOfLetter) => {
            if (e.target.innerHTML.toLowerCase() == letters.toLowerCase()) {
                theStates = true;
                arrayOfSpans.forEach((span, indexOfSpan) => {
                    if (indexOfLetter == indexOfSpan) {
                        span.innerHTML = letters;
                        correctAttempts++; // so important trick ####################################################
                    }
                });
            }
        });
        if (theStates !== true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            if (wrongAttempts === 8) {
                endGame();
                lettersContainer.classList.add("finished");
            }
        }
        if (correctAttempts === arrayWithoutSpace.length) {
            lettersContainer.classList.add("finished");
            let div = document.createElement("div");
            div.className = "popup";
            let divContent = document.createTextNode(`you win`);
            div.appendChild(divContent);
            document.body.appendChild(div);
        }
    }
});

function endGame() {
    let div = document.createElement("div");
    div.className = "popup";
    let divContent = document.createTextNode(
        `you lose the word was "${valueFromCategory}"`
    );
    div.appendChild(divContent);
    document.body.appendChild(div);
}
