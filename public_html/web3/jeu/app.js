
let cases = document.querySelectorAll(".case");
let replayBtn = document.querySelector("#replay");
let paneauMessage = document.querySelector("#message");

let joueurX = true;
let gagnant = '';
const patrons = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

for (let boite of cases) {
    boite.active = true;
    boite.addEventListener("click", function() {
        if (boite.active) {
            if (joueurX) {
                boite.innerText = "X";
                joueurX = false;
            }
            else {
                boite.innerText = "O";
                joueurX = true;
            }
        }
        boite.active = false;
    });
} 

replayBtn.addEventListener("click", function () {
    for (let boite of cases) {
        boite.active = true;
        boite.innerText = "";
    }
});