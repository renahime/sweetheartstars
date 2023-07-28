import members from './members.js';


function shuffleArray(array) {
  const shuffledArray = array.slice(); // Create a copy of the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }
  return shuffledArray;
}

// Set the number of members to display at a time
const membersPerSet = 4;

// Function to render a set of members based on the provided start index
function renderMembers(startIndex) {
  const shuffledMembers = shuffleArray(members);

  // Get the members for the current set based on the start index
  const currentMembers = shuffledMembers.slice(startIndex, startIndex + membersPerSet);

  // Clear the existing member boxes
  const membersContainer = document.querySelector('.members-container');
  membersContainer.innerHTML = '';

  // Loop through the current members and generate their boxes
  currentMembers.forEach((member) => {
    const memberBox = document.createElement('div');
    memberBox.classList.add('member-box');

    // Create the circle div
    const circleDiv = document.createElement('div');
    circleDiv.classList.add('circle');

    // Check if the member has a cropped_path and it's not "n/a"
    if (member.cropped_path && member.cropped_path !== "n/a") {
      circleDiv.style.backgroundImage = `url(${member.cropped_path})`;
      // Set any additional styles for the circle div
      circleDiv.style.backgroundSize = 'cover';
      circleDiv.style.backgroundPosition = 'center';
      circleDiv.style.borderRadius = '50%';
    }

    // Append the circle and text-section to the member box
    memberBox.appendChild(circleDiv);

    // Create the text-section
    const textSection = document.createElement('div');
    textSection.classList.add('text-section');
    // Extract the member's Instagram handle without the '@' symbol
    const instaHandle = member.insta.startsWith('@') ? member.insta.substring(1) : member.insta;
    // Populate the content of the text-section using member properties
    textSection.innerHTML = `
      <h2 class="full-member-name" onclick="redirectToSingleMemberPage('${member.name}')">${member.name}</h2>
      <p class="full-member-info" id="age">${member.age_pronouns !== "n/a" ? member.age_pronouns : ""}</p>
      <p class="full-member-info" id="insta">
        ${member.insta !== "n/a" ? `<a href="https://www.instagram.com/${instaHandle}/" target="_blank">${member.insta}</a>` : ""}
      </p>
      <p class="full-member-info" id="performance">${member.performance_roles !== "n/a" ? member.performance_roles : ""}</p>
      <p class="full-member-info" id="bts">${member.BTS_role !== "n/a" ? member.BTS_role : ""}</p>
    `;


    // Append the text-section to the member box
    memberBox.appendChild(textSection);

    // Append the member box to the members container
    membersContainer.appendChild(memberBox);
  });

}

// Function to handle the next arrow click event
function handleNextArrowClick() {
  const membersContainer = document.querySelector('.members-container');
  const startIndex = parseInt(membersContainer.dataset.startIndex) || 0;
  const nextIndex = (startIndex + membersPerSet) % members.length;

  renderMembers(nextIndex);
  membersContainer.dataset.startIndex = nextIndex;
}

// Function to handle the previous arrow click event
function handlePrevArrowClick() {
  const membersContainer = document.querySelector('.members-container');
  const startIndex = parseInt(membersContainer.dataset.startIndex) || 0;
  const prevIndex = (startIndex - membersPerSet + members.length) % members.length;

  renderMembers(prevIndex);
  membersContainer.dataset.startIndex = prevIndex;
}

// Add event listeners to the arrow buttons
const nextArrow = document.getElementById('next-arrow');
const prevArrow = document.getElementById('prev-arrow');
nextArrow.addEventListener('click', handleNextArrowClick);
prevArrow.addEventListener('click', handlePrevArrowClick);


// Render the initial set of members
renderMembers(0);
