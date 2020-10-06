const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownContainer = document.getElementById("countdown");
const countdownTitleEl = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
let timeElements = document.querySelectorAll(".countdown span");

const completeContainer = document.querySelector(".complete");
const completeBtn = document.getElementById("complete-button");
let completeInfo = document.getElementById("complete-info");

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

let countdownTitle = "";
let countdownDate = "";
let countdownValue;
let countdownActive;
let savedCountdown;

function onFormSubmit(event) {
  // 1. Prevent default behavior (refresh the page)
  event.preventDefault();
  // 2. Get the input values and assign them to variables
  countdownTitle = event.target[0].value;
  countdownDate = event.target[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  // 3. Save the countdown to the local storage
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  // 4. update DOM
  if (!countdownDate) {
    alert("Please select a date for the countdown.");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function updateDOM() {
  countdownActive = setInterval(() => {
    // 1. Distance between the set date and the current
    const current = new Date();
    const timeGap = current.getTimezoneOffset() * MINUTE;
    timeDistance = countdownValue - current + timeGap;
    // 2. Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDistance / DAY);
    const hours = Math.floor((timeDistance % DAY) / HOUR);
    const mins = Math.floor((timeDistance % HOUR) / MINUTE);
    const secs = Math.floor((timeDistance % MINUTE) / SECOND);
    // 3. Change UI
    inputContainer.hidden = true;
    if (timeDistance > 0) {
      // Show Countdown
      timeElements[0].textContent = days;
      timeElements[1].textContent = hours;
      timeElements[2].textContent = mins;
      timeElements[3].textContent = secs;
      countdownTitleEl.textContent = countdownTitle
        ? countdownTitle
        : "Untitled";
      countdownContainer.hidden = false;
      completeContainer.hidden = true;
    } else {
      // Show Complete
      clearInterval(countdownActive);
      completeInfo.textContent = `${
        countdownTitle ? countdownTitle : "Untitled countdown"
      } finished on ${countdownDate}`;
      countdownContainer.hidden = true;
      completeContainer.hidden = false;
    }
  }, 1000);
}

function reset() {
  // 1. Stop countdown
  clearInterval(countdownActive);
  // 2. Reset values
  countdownTitle = "";
  countdownDate = "";
  // 3. Clear local storage
  localStorage.removeItem("countdown");
  // 4. Change UI
  inputContainer.hidden = false;
  countdownContainer.hidden = true;
  completeContainer.hidden = true;
}

function init() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    // 1. Restore data
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    // 2. Assign the values to variables
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    // 3. Start countdown
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  } else {
    // Prevent setting the date before today
    dateEl.setAttribute("min", new Date().toISOString().split("T")[0]);
    reset();
  }
}

init();

// Event Listeners
countdownForm.addEventListener("submit", onFormSubmit);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);
