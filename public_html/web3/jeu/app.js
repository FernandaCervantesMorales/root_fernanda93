
let cases = document.querySelectorAll(".case");
let replayBtn = document.querySelector("#replay");
let paneauMessage = document.querySelector("#message");
let panneauMessageGaganant = document.querySelector("#message img")
let nul = document.getElementById("nul");
let yaygagnant1 = document.getElementById("yaygagnant1");
let yaygagnant2 = document.getElementById("yaygagnant2");
let yaynul = document.getElementById("yaynul");
let winner = false;

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
                boite.style.backgroundImage = "url('X.png')";
                joueurX = false;
            }
            else {
                boite.style.backgroundImage = "url('O.png')";
                joueurX = true;
            }
        }
        boite.active = false;
        valide();
    });
} 

const valide = function () {
    let allUsed = Array.from(cases).every(boite => !boite.active);
    if (allUsed && !winner) {
        console.log("C'est une partie nulle!");
        nul.classList.add("active");
    }
    for (let patron of patrons) {
//        let val1 = cases[patron[0]].innerText;
//        let val2 = cases[patron[1]].innerText;
//        let val3 = cases[patron[2]].innerText;
        let val1 = cases[patron[0]].style.backgroundImage.slice(5,10);
        let val2 = cases[patron[1]].style.backgroundImage.slice(5,10);
        let val3 = cases[patron[2]].style.backgroundImage.slice(5,10);

        if (val1 &&
            val1 === val2 &&
            val1 === val3) {
                console.log(`Le gagnant est ${val1}`);
                panneauMessageGaganant.src = val1;

                for (let boite of cases) {
                    boite.active = false;
                }
            }
    }
}

const audio = new Audio("restart.mp3");
replayBtn.addEventListener("click", function () {
    for (let boite of cases) {
        boite.active = true;
        boite.style.backgroundImage = "";
        joueurX = true
    }
    audio.play();
});

yaynul.addEventListener("click", function () {
    for (let boite of cases) {
        boite.active = true;
        boite.style.backgroundImage = "";
        joueurX = true;
    }
    winner = false;
    nul.classList.remove("active");
});
