const buttons = document.querySelectorAll(".row button");
const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const displayWinner = document.getElementById("winner");
const displayNextPlayer = document.getElementById("player");
const restartBtn = document.getElementById("res");
const form = document.querySelector("form");
let resultArray = Array(9).fill(null);
let isNextY = true;
let winner = '';
let opponent = 'player';


displayNextPlayer.textContent = "Start Player - X";

////==========================step for AI================================
////AI steps is only increasing and choose first null-value
// buttons[0] === null || buttons[1] === null and so on ...
function stepAI() {
    if (!isNextY && opponent === "ai") {
        // when AI is "thinking" user can't push any button
        buttons.forEach(btn=>{
            btn.style.pointerEvents='none';
        });
        setTimeout(() => {
            for (let k = 0; k < resultArray.length; k++) {
                if (resultArray[k] === null) {
                    Array.from(buttons).some(function (item, ind) {
                        if (k === ind) {
                            displayNextPlayer.textContent = "Next Player - X";
                            isNextY = true;
                            return (item.textContent = "Y")
                        }
                    });
                    resultArray[k] = "Y";
                    break;
                }
            }
            isWinner();
            //when AI "clicked" button, user make step
            buttons.forEach(btn=>{
                btn.style.pointerEvents='auto';
            })
            ///delay for AI step
        }, (Math.floor(Math.random() * (5 - 1) + 1)*1000))
    }
}

////=============================restart app=====================================
function restart() {
    resultArray = Array(9).fill(null);
    isNextY = true;
    displayWinner.textContent = "";
    displayNextPlayer.textContent = "Start Player - X";
    buttons.forEach((button) => {
        button.disabled = false;
        button.textContent = "";
        winner = '';
    });
}

restartBtn.addEventListener("click", restart);

////==============================check winner======================================
function isWinner() {
    for (let i = 0; i < winLines.length; i++) {
        const [a, b, c] = winLines[i];
        if (
            resultArray[a] &&
            resultArray[a] === resultArray[b] &&
            resultArray[a] === resultArray[c]
        ) {
            displayWinner.textContent = `WINNER ${resultArray[a]}`;
            winner = `WINNER ${opponent} ${resultArray[a]}`;
            buttons.forEach((button) => (button.disabled = true));
        } else {
            isDraw();
        }
    }
}

////=============================check if draw=====================================
function isDraw() {
    if (winner === '' && !resultArray.includes(null)) {
        displayWinner.textContent = 'It is a draw';
        buttons.forEach((button) => (button.disabled = true));
    }
}

////==============================when click on button====================================
buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
        if (this.textContent === "") {
            isNextY ? (this.textContent = "X") : (this.textContent = "Y");
            isNextY ? (displayNextPlayer.textContent = `Next ${opponent} - Y`) : (displayNextPlayer.textContent = "Next Player - X");
            isNextY = !isNextY;
            resultArray[this.getAttribute("data-value")] = this.textContent;
        }
        isWinner();
        stepAI();
    });
});
// /===============================form=================================/
form.addEventListener("submit", function (event) {
    const data = new FormData(form);
    for (const entry of data) {
        opponent = entry[1];
    }
    restart();
    event.preventDefault();
}, false);


