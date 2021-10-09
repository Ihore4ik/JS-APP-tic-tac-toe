const buttons = document.querySelectorAll(".row button");
const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let resultArray = Array(9).fill(null);
let isNextY = true;
const whoIsWin = document.getElementById("h1");
const restartBtn = document.getElementById("res");

const restart = () => {
    resultArray = Array(9).fill(null);
    isNextY = true;
    whoIsWin.textContent = "";
    buttons.forEach((button) => {
        button.disabled = false;
        button.textContent = "";
    });
};
restartBtn.addEventListener("click", restart);

function isWinner() {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            resultArray[a] &&
            resultArray[a] === resultArray[b] &&
            resultArray[a] === resultArray[c]
        ) {
            whoIsWin.textContent = `WIN ${resultArray[a]}`;
            buttons.forEach((button) => (button.disabled = true));
        }
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
        if (this.textContent === "") {
            isNextY ? (this.textContent = "X") : (this.textContent = "Y");
            isNextY = !isNextY;
            resultArray[this.getAttribute("data-value")] = this.textContent;
        }
        isWinner();
    });
});








