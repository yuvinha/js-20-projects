// UI
const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
// Progress Bar
const progressBar = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
// Player Controls
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let isPlaying = false;
let songIndex = 0;

// Songs List
const songs = [
  {
    id: 1,
    title: "The Jazz Piano",
    artist: "Benjamin Tissot",
  },
  {
    id: 2,
    title: "All That",
    artist: "Benjamin Tissot",
  },
  {
    id: 3,
    title: "Hip Jazz",
    artist: "Benjamin Tissot",
  },
  {
    id: 4,
    title: "Jazzy Frenchy",
    artist: "Benjamin Tissot",
  },
];

/**
 * Audio Player Functionality
 */
function playSong() {
  music.play();
  isPlaying = true;
  play.classList.replace("fa-play", "fa-pause");
  play.setAttribute("title", "Pause");
}

function pauseSong() {
  music.pause();
  isPlaying = false;
  play.classList.replace("fa-pause", "fa-play");
  play.setAttribute("title", "Play");
}

function loadSong() {
  img.src = `img/pawel-czerwinski-${songs[songIndex].id}.jpg`;
  music.src = `music/bensound-jazz-${songs[songIndex].id}.mp3`;
  title.textContent = songs[songIndex].title;
  artist.textContent = songs[songIndex].artist;
  // Hide time texts while loading (to prevent displaying NaN)
  currentEl.hidden = true;
  durationEl.hidden = true;
}

function changeSong(dir) {
  // 1. Update Song Index
  dir === "prev" ? songIndex-- : songIndex++;
  if (songIndex < 0) songIndex = songs.length - 1;
  if (songIndex > songs.length - 1) songIndex = 0;

  // 2. Update DOM
  loadSong();
  playSong();
}

/**
 * Progress Bar
 */
function formatTime(time) {
  const formattedMinute = Math.floor(time / 60);
  const formmatedSecond = Math.floor(time % 60).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  });

  return formattedMinute + ":" + formmatedSecond;
}

function updateProgressBar() {
  const currentTime = music.currentTime;
  const duration = music.duration;

  // Update progress bar
  progress.style.width = `${(currentTime / duration) * 100}%`;

  // Update time texts
  currentEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

function setProgressBar(event) {
  // console.dir(this);
  const position = event.offsetX / this.clientWidth;
  music.currentTime = position * music.duration;
  playSong();
}

/**
 * Event Listeners
 */

play.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prev.addEventListener("click", () => changeSong("prev"));
next.addEventListener("click", () => changeSong("next"));
music.addEventListener("timeupdate", updateProgressBar);
music.onloadedmetadata = () => {
  // Show time texts after loading
  currentEl.hidden = false;
  durationEl.hidden = false;
  // Render formatted texts
  const currentTime = music.currentTime;
  const duration = music.duration;
  currentEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
};
progressBar.addEventListener("click", setProgressBar);

/**
 * Init
 */
loadSong();
