console.log("game loaded!")

const stage = document.querySelector("body");
const myBrooke = document.getElementById("brooke");

const heComplains = new Audio("sounds/swoosh.mp3")

myBrooke.onclick = function() {
    this.classList.toggle("move");
    heComplains.play();
}

stage.addEventListener("click", function(event) {
    console.log(event.clientX + " : " +event.clientY);

    //var coords = "translateX("+event.clientX+"px) translateY("px)";
    var coords = `translateX(${event.clientX-300}px) translateY(${event.clientY-523}px)`;
    myBrooke.style.transform = coords;

})

// Keyboard innput
document.onkeydown = checkKeys;

function checkKeys(event) {

    var style = window.getComputedStyle(myBrooke);
    var matrix = new WebKitCSSMatrix(style.transform);
    var xVal = matrix.m41;
    var yVal = matrix.m42;

    var coords;

    // left arrow
    if(event.keyCode == "37") {
        coords = `translateX(${xVal-250}px) translateY(${yVal}px)`;
        myBrooke.style.transform = coords;
    }

    if(event.keyCode == "39") {
        coords = `translateX(${xVal+250}px) translateY(${yVal}px)`;
        myBrooke.style.transform = coords;
    }

    if(event.keyCode == "38") {
        coords = `translateX(${xVal}px) translateY(${yVal-250}px)`;
        myBrooke.style.transform = coords;
    }

    if(event.keyCode == "40") {
        coords = `translateX(${xVal}px) translateY(${yVal+250}px)`;
        myBrooke.style.transform = coords;
    }
}

function addMyObject() {
    /* Custom Object */
    let myObject = document.createElement("img");
    myObject.src = "img/magnifing_glass.svg";
    stage.append(myObject);
    //read window's available width & height in px
    let w = window.innerWidth;
    let h = window.innerHeight;
    // randomize new X & Y numbers within space limits
    let randomX = Math.floor((Math.random() * w) + 64);
    let randomY = Math.floor((Math.random() * h) + 49);

    myObject.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`;
    
    setTimeout(() => { myObject.remove(); },5000)
}

addMyObject();