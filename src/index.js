/* eslint-disable no-console */
import "bootstrap/dist/css/bootstrap.css";

const baseURL = "http://restcountries.eu/rest/v1/alpha?codes=";
let currentlyClicked = {};
let lastClicked = undefined;

document.getElementById("svg2").addEventListener("click", event => {
  // Prune the last part of the id.
  currentlyClicked = event.target;
  var prunedID = currentlyClicked.id.split("-")[0];
  fetchCountry(baseURL, prunedID, updateParagraph, updateFillCountry);
});

const updateParagraph = input => {
  var country = input[0];
  var paragraph = document.getElementById("country");
  paragraph.innerText = country.name;
};

const updateFillCountry = () => {
  if (typeof lastClicked !== "undefined") {
    lastClicked.style.fill = "#c0c0c0";
  }
  currentlyClicked.style.fill = "purple";
  lastClicked = currentlyClicked;
};

const fetchCountry = (url, input, updateParagraph, updateFillCountry) => {
  fetch(url + input)
    .then(response => {
      return response.json();
    })
    .then(data => {
      updateParagraph(data);
      updateFillCountry();
    });
};
