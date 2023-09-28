# te-cookie-stand

### Sales.html Coding Notes

I found different ways to get user input from a form, with some ways
(subjectively) better than others.

1. The submit method.

Taught to us in class, this method is valid. However, I could only get one type of button to work here, which is the submit button.

```js
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
```

### Warning: Unless you know what these methods do, you should probably not use these, as these aren't directly taught in class.

2. The FormData method.

Okay, I'll be honest. I just learnt about FormData from AI, so this is brand new information to me.

```js
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
});

renderTableHeader();
renderTableBody();
```

Advantages of using FormData:

- If someone's reading the code, this is a (somewhat) clear indicator that you are gathering form data from some form element.
- You can access the form data in more than one element.

Disadvantages of using FormData:

- You can't directly access FormData using bracket or dot notation, which can make reading the code seem confusing.
- To someone who is not familiar with FormData, this can be confusing.

3. Accessing the Form's elements. (my current method)

```js
const inputForm = document.getElementById("cookies-input-form");
const addLocationBtn = document.getElementById("add-location-btn");

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

renderTableHeader();
renderTableBody();
```

Advantages of using accessing the form elements:

- You can access form elements directly from the form itself.

Disadvantages:

- This selects ALL the elements from the form when you call the function.
