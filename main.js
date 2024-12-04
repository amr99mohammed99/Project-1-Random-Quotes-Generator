// get all selectors
let generateBtn = document.querySelector(".generate");
let autoBtn = document.querySelector(".auto");
let stopBtn = document.querySelector(".stop");
let quoteDiv = document.querySelector(".quote-display");
let quoteId = document.querySelector(".quote-id");
let authorTx = document.querySelector(".author-tx");
let autoStatus = document.querySelector(".auto-status");
let intervalId;

generateBtn.onclick = generateQuote;
autoBtn.onclick = startAutoPlay;
stopBtn.onclick = stopAutoPlay;

async function getQuotes() {
  const response = await fetch("/quotes.json");
  const data = await response.json();
  return data;
}

async function generateQuote() {
  const quotes = await getQuotes();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDiv.innerHTML = quote.text;
  quoteId.innerHTML = quote.id;
  authorTx.innerHTML = quote.author;
}

// Track whether autoplay is active
let isAutoPlaying = false;

function startAutoPlay() {
  // Prevent further clicks if already playing
  if (isAutoPlaying) {
    return;
  } 
  // Mark autoplay as active
  isAutoPlaying = true; 

  intervalId = setInterval(generateQuote, 2000);
  autoStatus.innerHTML = "Auto: ON";
  autoStatus.style.backgroundColor = "#1E1B1E";
  autoBtn.classList.add("colored");

  // Optionally, disable the button while autoplay is running
  autoBtn.disabled = true;
}

function stopAutoPlay() {
  clearInterval(intervalId);
  autoStatus.innerHTML = "";
  autoStatus.style.backgroundColor = "transparent";
  autoBtn.classList.remove("colored");
  intervalId = null;

  // Re-enable the button if autoplay is stopped
  autoBtn.disabled = false;
  // Reset the autoplay flag
  isAutoPlaying = false;
}

