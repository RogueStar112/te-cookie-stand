import * as app from "./app.js";

const table_form = document.getElementById("cookies-input-form");

table_form.addEventListener("submit", function (e) {
  e.preventDefault();

  const userInput = {
    // used bracket notation, as dashes don't work in dot notation.
    name: e.target["form-name"].value,
    minCust: parseInt(e.target["form-mincust"].value),
    maxCust: parseInt(e.target["form-maxcust"].value),
    avgCps: parseFloat(e.target["form-avgcps"].value),
  };

  // console.log(typeof userInput.minCust, typeof userInput.maxCust);

  createStoreLocation(
    userInput.name,
    userInput.minCust,
    userInput.maxCust,
    userInput.avgCps
  );
});

renderTableHeader();
renderTableBody();
