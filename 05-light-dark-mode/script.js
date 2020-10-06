const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.querySelector("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

// Helper function for image sources
function imageMode(color) {
  image1.src = `img/undraw_personal_website_${color}.svg`;
  image2.src = `img/undraw_personal_goals_${color}.svg`;
  image3.src = `img/undraw_personal_settings_${color}.svg`;
}

function toggleMode(mode) {
  localStorage.setItem("theme", mode);
  document.documentElement.setAttribute("data-theme", mode);
  nav.style.backgroundColor =
    mode === "dark" ? "rgba(0, 0, 0, .5)" : "rgba(255, 255, 255, .5)";
  textBox.style.backgroundColor =
    mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";
  toggleIcon.children[0].textContent =
    mode === "dark" ? "Dark Mode" : "Light Mode";
  mode === "dark"
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  imageMode(mode);
}

// Dark Mode
/* function darkMode() {
  console.log("darkmode");
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
  nav.style.backgroundColor = "rgba(0, 0, 0, .5)";
  textBox.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  toggleIcon.children[0].textContent = "Dark Mode";
  toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
  imageMode("dark");
} */

// Light Mode
/* function lightMode() {
  console.log("lightmode");
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
  nav.style.backgroundColor = "rgba(255, 255, 255, .5)";
  textBox.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  toggleIcon.children[0].textContent = "Light Mode";
  toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  imageMode("light");
} */

// Event Listener
toggleSwitch.onchange = (event) =>
  event.target.checked ? toggleMode("dark") : toggleMode("light");

// Load
const savedTheme = localStorage.getItem("theme");
window.onload = () => {
  toggleMode(savedTheme);
  toggleSwitch.checked = savedTheme === "dark" ? true : false;
};
