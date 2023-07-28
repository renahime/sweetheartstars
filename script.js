import members from './members.js';
import photos from './photos.js';

function getRandomPhoto() {
  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex].path;
}

function setRandomPhoto() {
  const middleImg = document.querySelector('.middle-img');
  const randomPhoto = getRandomPhoto();
  middleImg.style.backgroundImage = `url(${randomPhoto})`;
}

setRandomPhoto(); // Set a random photo initially

// Change photo every 5 seconds
setInterval(() => {
  setRandomPhoto();
}, 5000);

function displayRandomMemberInAllBoxes() {
  const allBoxes = document.querySelectorAll('.left-box, .right-box');

  // Loop through all the boxes and update their content with a random member
  allBoxes.forEach((box) => {
    if (members.length === 0) {
      // If all members have been displayed, reset the array to its initial state
      members = initialMembers.slice();
    }

    // Get random index from the members array
    const randomIndex = Math.floor(Math.random() * members.length);

    // Get the member object at the random index
    const randomMember = members[randomIndex];

    // Remove the selected member from the members array to avoid duplication
    members.splice(randomIndex, 1);

    // Update the HTML with the random member's name and Instagram handle
    box.querySelector('.member-name').textContent = randomMember.name;
    box.querySelector('.member-insta').textContent = randomMember.insta;

    // Set the background image of the circle div
    box.querySelector('.circle').style.backgroundImage = `url(${randomMember.cropped_path})`;
  });
}


function drawSideLines() {
  const leftBoxes = document.querySelectorAll('.left-box');
  const rightBoxes = document.querySelectorAll('.right-box');

  if (leftBoxes.length === 0 || rightBoxes.length === 0) {
    console.error("Left or right boxes not found. Make sure they have the correct class names.");
    return;
  }

  // Get the side line container
  const sideLineContainer = document.querySelector('.side-line-container');

  // Create and position lines for left boxes
  for (const leftBox of leftBoxes) {
    const leftBoxRect = leftBox.getBoundingClientRect();
    const leftLine = document.createElement('div');
    leftLine.classList.add('side-line', 'side-line-left');

    // Calculate the left line length (from the left side of the screen to the left side of the box container)
    const leftLineLength = leftBoxRect.left + 20;

    leftLine.style.width = `${leftLineLength}px`;
    leftLine.style.top = `${(leftBoxRect.top + leftBoxRect.height / 2) - window.innerHeight}px`; // Position the line vertically in the middle of the box container

    sideLineContainer.appendChild(leftLine);
  }

  // Create and position lines for right boxes
  for (const rightBox of rightBoxes) {
    const rightBoxRect = rightBox.getBoundingClientRect();
    const rightLine = document.createElement('div');
    rightLine.classList.add('side-line', 'side-line-right');

    // Calculate the right line length (from the right side of the screen to the right side of the box container)
    const rightLineLength = window.innerWidth - rightBoxRect.right - 15;

    rightLine.style.width = `${rightLineLength}px`;
    rightLine.style.right = 0; // Align the right line to the right side of the screen
    rightLine.style.top = `${(rightBoxRect.top + rightBoxRect.height / 2) - window.innerHeight}px`; // Position the line vertically in the middle of the box container

    sideLineContainer.appendChild(rightLine);
  }
}

function onPageLoad() {
  drawSideLines();
  displayRandomMemberInAllBoxes();
}

// Call the combined function when the page loads
window.onload = onPageLoad;



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
  const maxHeight = window.innerHeight * 0.9; // 90% of the page height

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
    starWrapper.style.transform = `translateY(${randomYPosition}px)`;

    // Get the corresponding line element
    const line = starWrapper.querySelector(".line");

    // Set the initial height of the line to reach the middle of the star
    const starMiddleY = randomYPosition + starWrapper.offsetHeight / 2;
    line.style.height = `${starMiddleY}px`;
  });
}

// Call the function to place stars and lines randomly initially
addInitialStarAndLinePositions();

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

    // Update the star's position using transform: translateY()
    starWrapper.style.transform = `translateY(${clampedYPosition}px)`;

    // Get the corresponding line element
    const line = starWrapper.querySelector(".line");

    // Calculate the middle position of the star after scrolling
    const starMiddleY = clampedYPosition + starWrapper.offsetHeight / 2;

    // Update the line's height to reach the middle of the star
    line.style.height = `${starMiddleY}px`;
  });
}

// Attach the updateStarAndLinePositions function to the scroll event
window.addEventListener("scroll", updateStarAndLinePositions);
// Call the function to place stars and lines randomly initially
addInitialStarAndLinePositions();

// Attach the resetStarPositions function to the resize event
window.addEventListener("resize", resetStarPositions);
