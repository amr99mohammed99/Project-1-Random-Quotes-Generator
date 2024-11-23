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
  const response = await fetch("quotes.json");
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

function startAutoPlay() {
  intervalId = setInterval(generateQuote, 2000);
  autoStatus.innerHTML = "Auto: ON";
  autoStatus.style.backgroundColor = "#1E1B1E";
}

function stopAutoPlay() {
  clearInterval(intervalId);
  autoStatus.innerHTML = "";
  autoStatus.style.backgroundColor = "transparent";
  intervalId = null;
}