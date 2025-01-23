console.log("💻")

const circles = document.querySelectorAll(".cricle")

circles.forEach(function (item, index) {
  item.addEventListener("click", function() {
    alert("circle clicked: " + index);
  })
})