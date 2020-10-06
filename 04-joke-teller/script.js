const audioElement = document.querySelector(".audio");
const btn = document.querySelector(".btn");

// toggle Button
function toggleButton() {
  btn.disabled = !btn.disabled;
}

// Converse text to speech via Voice RSS API (http://www.voicerss.org/api/)
function tellMe(joke) {
  VoiceRSS.speech({
    key: "499e59bdf43640d68eef50114c7c9ded",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from Joke API (https://sv443.net/jokeapi/v2/)
async function getJokes() {
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const text = (function () {
      switch (data.type) {
        case "single":
          return data.joke;
        case "twopart":
          return `${data.setup} ... ${data.delivery}`;
        default:
          return;
      }
    })();

    tellMe(text);
    toggleButton();
  } catch (err) {
    console.log("Error: " + err);
  }
}

// Event Listener
btn.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
