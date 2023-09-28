import * as app from "./app.js";

const inputForm = document.getElementById("cookies-input-form");
const addLocationBtn = document.getElementById("add-location-btn");
const editLocationBtn = document.getElementById("edit-location-btn");
const deleteLocationBtn = document.getElementById("delete-location-btn");

addLocationBtn.addEventListener("click", function () {
  const formData = inputForm["elements"];

  const userInput = {
    // used bracket notation, as dashes don't work in dot notation.
    name: formData["form-name"]["value"],
    minCust: parseInt(formData["form-mincust"]["value"]),
    maxCust: parseInt(formData["form-maxcust"]["value"]),
    avgCps: parseFloat(formData["form-avgcps"]["value"]),
  };
  // const formData = new FormData(inputForm);
  console.log(typeof formData, formData);

  console.log(userInput);

  createStoreLocation(
    userInput.name,
    userInput.minCust,
    userInput.maxCust,
    userInput.avgCps
  );
});

editLocationBtn.addEventListener("click", function () {
  const formData = inputForm["elements"];

  const userInput = {
    // used bracket notation, as dashes don't work in dot notation.
    name: formData["form-name"]["value"],
    minCust: parseInt(formData["form-mincust"]["value"]),
    maxCust: parseInt(formData["form-maxcust"]["value"]),
    avgCps: parseFloat(formData["form-avgcps"]["value"]),
  };

  editStoreLocation(userInput.name);
});

deleteLocationBtn.addEventListener("click", function () {
  const formData = inputForm["elements"];

  const userInput = {
    // used bracket notation, as dashes don't work in dot notation.
    name: formData["form-name"]["value"],
    minCust: parseInt(formData["form-mincust"]["value"]),
    maxCust: parseInt(formData["form-maxcust"]["value"]),
    avgCps: parseFloat(formData["form-avgcps"]["value"]),
  };

  deleteStoreLocation(userInput.name);
});

renderTableHeader();
renderTableBody();
