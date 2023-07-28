import members from './members.js';

function setSingleMemberBoxHeight() {
  const windowHeight = window.innerHeight;
  const height = windowHeight - 75;
  const singleMemberBox = document.querySelector('.single-member-box');
  singleMemberBox.style.height = `${height}px`;
}

// Function to retrieve the 'name' parameter from the URL
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Function to render the member's information based on the 'name' parameter
function renderMemberInfo() {
  const nameParameter = getParameterByName('name');
  const member = members.find((m) => m.name === nameParameter);

  if (member) {
    document.getElementById('title').textContent = member.name;
    document.getElementById('age').textContent = "Age: " + member.age_pronouns;
    document.getElementById('insta').innerHTML =
      member.insta !== 'n/a' ? `<a href="https://www.instagram.com/${member.insta.slice(1)}/" target="_blank">${"Insta: " + member.insta}</a>` : '';
    document.getElementById('performance').textContent = "Performance Role: " + member.performance_roles;
    document.getElementById('bts').textContent = "BTS Role: " + member.BTS_role;
    document.getElementById('attribute').textContent = "Attribute: " + member.attribute;
    document.getElementById('height').textContent = "Height: " + member.height;
    document.getElementById('fav_food').textContent = "Likes: " + member.fav_food;
    document.getElementById('disliked_food').textContent = "Dislikes: " + member.disliked_food;
    document.getElementById('charm').textContent = "Charm: " + member.charm;
    document.getElementById('about').textContent = "About: " + member.about;

    // Assuming you have the 'member-photo' class for the member's photo
    const memberPhoto = document.querySelector('.single-member-photo');
    console.log(memberPhoto)
    if (memberPhoto) {
      // Set the background image of the member photo
      memberPhoto.style.backgroundImage = `url(${member.photo_path})`;
      // Set any additional styles for the member photo here
      // ...
    }
  } else {
    // Member not found, handle error here (e.g., redirect to a 404 page)
    console.error(`Member with name '${nameParameter}' not found.`);
  }
}

// Call the function to render the member's information on page load
renderMemberInfo();


// Call the function to set the initial height
setSingleMemberBoxHeight();

// Add an event listener to adjust the height on window resize
window.addEventListener('resize', setSingleMemberBoxHeight);
