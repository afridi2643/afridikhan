const gameContainer = document.getElementById("game-container");
const basket = document.getElementById("basket");
const scoreBoard = document.getElementById("score-board");

let score = 0;

// Move basket with arrow keys
document.addEventListener("keydown", (e) => {
  const basketRect = basket.getBoundingClientRect();
  const containerRect = gameContainer.getBoundingClientRect();
  
  if (e.key === "ArrowLeft" && basketRect.left > containerRect.left) {
    basket.style.left = basket.offsetLeft - 20 + "px";
  } else if (e.key === "ArrowRight" && basketRect.right < containerRect.right) {
    basket.style.left = basket.offsetLeft + 20 + "px";
  }
});

// Create falling objects
function createObject() {
  const object = document.createElement("div");
  object.classList.add("object");
  object.style.left = Math.random() * (window.innerWidth - 30) + "px";
  gameContainer.appendChild(object);

  let fallInterval = setInterval(() => {
    const objectRect = object.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    // Collision detection
    if (
      objectRect.bottom >= basketRect.top &&
      objectRect.left >= basketRect.left &&
      objectRect.right <= basketRect.right
    ) {
      score++;
      scoreBoard.textContent = `Score: ${score}`;
      object.remove();
      clearInterval(fallInterval);
    }

    // Remove object if it falls out of view
    if (objectRect.top > window.innerHeight) {
      object.remove();
      clearInterval(fallInterval);
    }

    object.style.top = object.offsetTop + 5 + "px";
  }, 20);

  setTimeout(createObject, 1000);
}

// Start game
createObject();
