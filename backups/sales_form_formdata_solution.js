import * as app from "./app.js";

const inputForm = document.getElementById("cookies-input-form");
const addLocationBtn = document.getElementById("add-location-btn");

addLocationBtn.addEventListener("click", function () {
  const formData = new FormData(inputForm);
  console.log(typeof formData, formData);

  const userInput = {
    // used bracket notation, as dashes don't work in dot notation.
    name: formData.get("form-name"),
    minCust: parseInt(formData.get("form-mincust")),
    maxCust: parseInt(formData.get("form-maxcust")),
    avgCps: parseFloat(formData.get("form-avgcps")),
  };
  console.log(userInput);
});

// table_form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const userInput = {
//     // used bracket notation, as dashes don't work in dot notation.
//     name: e.target["form-name"].value,
//     minCust: parseInt(e.target["form-mincust"].value),
//     maxCust: parseInt(e.target["form-maxcust"].value),
//     avgCps: parseFloat(e.target["form-avgcps"].value),
//   };

//   // console.log(typeof userInput.minCust, typeof userInput.maxCust);

//   createStoreLocation(
//     userInput.name,
//     userInput.minCust,
//     userInput.maxCust,
//     userInput.avgCps
//   );
// });

renderTableHeader();
renderTableBody();
