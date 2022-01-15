const quoteButton = document.getElementById("quoteButton");

quoteButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getQuote,
  });
});

function getQuote(){
  fetch("https://www.officeapi.dev/api/quotes/random")
    .then(response => response.json())
    .then(parsedResponse => {return `${parsedResponse.data.content}\n\n   -${parsedResponse.data.character.firstname} ${parsedResponse.data.character.lastname}`})
    .then(string => alert(string));
    // .then(parsedResponse => alert(JSON.stringify(parsedResponse)));
}
