//3781x1151

window.addEventListener("scroll", setScrollVar)
window.addEventListener("resize", setScrollVar)

function setScrollVar() {
  const htmlElement = document.documentElement
  const percentOfScreenHeightScrolled =
    htmlElement.scrollTop / htmlElement.clientHeight
  console.log(Math.min(percentOfScreenHeightScrolled * 100, 100))
  htmlElement.style.setProperty(
    "--scroll",
    Math.min(percentOfScreenHeightScrolled * 100, 100)
  )
}

setScrollVar()

const observer = new IntersectionObserver(entries => {
  for (let i = entries.length - 1; i >= 0; i--) {
    const entry = entries[i]
    if (entry.isIntersecting) {
      document.querySelectorAll("[data-img]").forEach(img => {
        img.classList.remove("show")
      })
      const img = document.querySelector(entry.target.dataset.imgToShow)
      img?.classList.add("show")
      break
    }
  }
})

// Function to get a random Y-axis position for the stars
function getRandomYPosition() {
  // Get the height of the top part of the page (adjust this value as needed)
  const maxHeight = window.innerHeight * 0.5; // 90% of the page height

  // Generate a random value between 0 and maxHeight
  return Math.floor(Math.random() * maxHeight);
}

// Function to place each star and its line in a random Y-axis position
function addInitialStarAndLinePositions() {
  // Get all star and line elements
  const starWrappers = document.querySelectorAll(".star-wrapper");

  // Loop through each star wrapper and set its random Y-axis position
  starWrappers.forEach((starWrapper) => {
    const randomYPosition = getRandomYPosition();
    starWrapper.dataset.initialPosition = randomYPosition; // Store initial position
    starWrapper.style.transition = "transform 0.5s ease"; // Add CSS transition
    starWrapper.style.transform = `translateY(${randomYPosition}px)`;

    // Get the corresponding line element
    const line = starWrapper.querySelector(".line");

    // Set the offset value to bring the line closer to the star (adjust this value as needed)
    const offset = 5; // Adjust this value as needed

    // Position the line to extend from the bottom of the star to the top of the window
    const starBottom = randomYPosition + starWrapper.offsetHeight - offset;
    line.style.transition = "bottom 0.5s ease"; // Add CSS transition
    line.style.bottom = `${starBottom}px`;
    line.style.height = `${window.innerHeight - starBottom}px`;
  });
}

// Function to reset stars to their initial positions
function resetStarPositions() {
  // Get all star and line elements
  const starWrappers = document.querySelectorAll(".star-wrapper");

  // Loop through each star wrapper and reset its position to the initial value
  starWrappers.forEach((starWrapper) => {
    const initialPosition = parseInt(starWrapper.dataset.initialPosition, 10);
    starWrapper.style.transform = `translateY(${initialPosition}px)`;

    // Get the corresponding line element
    const line = starWrapper.querySelector(".line");

    // Set the offset value to bring the line closer to the star (adjust this value as needed)
    const offset = 5; // Adjust this value as needed

    // Position the line to extend from the bottom of the star to the top of the window
    const starBottom = initialPosition + starWrapper.offsetHeight - offset;
    line.style.bottom = `${starBottom}px`;

    // Reset the line height to its initial value
    line.style.height = `${window.innerHeight - starBottom}px`;
  });
}

// Function to update star and line positions on scroll
let prevScrollY = 0; // Variable to store the previous scroll position

function updateStarAndLinePositions() {
  // Get the scroll position
  const scrollY = window.scrollY;

  // Get the scroll direction (1 for scrolling down, -1 for scrolling up)
  const scrollDirection = scrollY > prevScrollY ? 1 : -1;

  // Update the previous scroll position for the next call
  prevScrollY = scrollY;

  // Get all star and line elements
  const starWrappers = document.querySelectorAll(".star-wrapper");

  // Loop through each star wrapper and update its position based on scroll
  starWrappers.forEach((starWrapper) => {
    const initialPosition = parseInt(starWrapper.dataset.initialPosition, 10);

    // Apply a scaling factor to control the star's movement speed
    const scalingFactor = 0.5; // Adjust this value as needed

    // Calculate the new Y-axis position based on the scroll direction
    const starNewYPosition = initialPosition + scrollDirection * scrollY * scalingFactor;

    // Get the height of the top part of the page (adjust this value as needed)
    const maxHeight = window.innerHeight * 0.9; // 90% of the page height

    // Keep the stars within the visible area of the page
    const minYPosition = 0;
    const maxYPosition = maxHeight - starWrapper.offsetHeight;
    const clampedYPosition = Math.min(Math.max(starNewYPosition, minYPosition), maxYPosition);

    // Update the star's position
    starWrapper.style.transform = `translateY(${clampedYPosition}px)`;

    // Get the corresponding line element
    const line = starWrapper.querySelector(".line");

    // Set the offset value to bring the line closer to the star (adjust this value as needed)
    const offset = 5; // Adjust this value as needed

    // Position the line to extend from the bottom of the star to the top of the window
    const starBottom = clampedYPosition + starWrapper.offsetHeight - offset;

    // Calculate the line height based on the difference in positions
    let lineHeight = Math.abs(clampedYPosition - initialPosition) + starWrapper.offsetHeight;

    if (scrollDirection === 1) {
      lineHeight = initialPosition + starWrapper.offsetHeight - starBottom + scrollY;
    }

    // Update the line's position and height
    line.style.bottom = `${starBottom}px`;
    line.style.height = `${lineHeight}px`;
  });
}




// Call the function to place stars and lines randomly initially
addInitialStarAndLinePositions();

// Add an event listener to update star and line positions on scroll
window.addEventListener("scroll", updateStarAndLinePositions);

// Call the function to reset stars to their initial positions on page load
window.addEventListener("load", resetStarPositions);


// Add an event listener to update star and line positions on scroll
window.addEventListener("scroll", updateStarAndLinePositions);
document.querySelectorAll("[data-img-to-show]").forEach(section => {
  observer.observe(section)
})
