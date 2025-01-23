console.log("JS 2 is loaded");

// Step 1 - selecting your element
const myStar = document.getElementById("star-five")

// Step 2 - adding a click event
// myStar.addEventListener("click", () => {
// 
// });

myStar.addEventListener("click", () => {
    // myStar.style.borderBottom = "80px solid pink";
    myStar.classList.toggle("change-me")
})