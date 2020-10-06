/**
 * Random Quote API: https://forismatic.com/en/api/
 */

const quoteText = document.querySelector(".quote-text");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const twitterBtn = document.querySelector(".btn--twitter");
const newBtn = document.querySelector(".btn--new");
const container = document.querySelector(".container");
const loader = document.querySelector(".loader");

function showLoader() {
  loader.hidden = false;
  container.hidden = true;
}

function removeLoader() {
  if (!loader.hidden) {
    loader.hidden = true;
    container.hidden = false;
  }
}

async function getQuote() {
  //   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const proxyUrl = "https://fathomless-lake-67695.herokuapp.com/";
  const apiUrl =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    // 1. Add loader
    showLoader();

    // 2. Fetch data
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // console.log(data);

    // 3. If lengthy, apply long-quote class
    data.quoteText.length > 120
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");

    // 4. Update DOM contents
    quote.innerText = data.quoteText;
    author.innerText = data.quoteAuthor === "" ? "Unknown" : data.quoteAuthor;

    // 5. Remove loader
    removeLoader();
  } catch (err) {
    console.log(err);
    getQuote();
  }
}

function tweetQuote() {
  const quoteText = quote.innerText;
  const authorText = author.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;
  window.open(twitterUrl, "_blank");
}

// Add Event Listners
twitterBtn.addEventListener("click", tweetQuote);
newBtn.addEventListener("click", getQuote);

// OnLoad
getQuote();
