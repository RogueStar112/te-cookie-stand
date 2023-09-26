const hours = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCustomers(obj) {
  // added +1 to generate 1 to 10 customers

  let newCustomers = randomNumber(
    obj.min_hourly_customers,
    obj.max_hourly_customers
  );

  return newCustomers;
}

/* Why is this in a list?

Because I do not want to create new locations by hand, so this is an easier way
of implementing sales.

*/

function StoreLocation(
  name,
  minCust,
  maxCust,
  avgCps,
  custPh = [],
  avgCookPh = [],
  totalCookies = 0
) {
  this.location = name;
  this.min_hourly_customers = minCust;
  this.max_hourly_customers = maxCust;
  this.avg_cookies_per_sale = avgCps;
  this.customers_per_hour = custPh;
  this.avg_cookies_per_hour = avgCookPh;
  this.total_cookies_sold = totalCookies;
}

// These two functions are combined, in calculateSales.
StoreLocation.prototype.calculateCustomersPerHour = function () {
  for (let i = 0; i < hours.length; i++) {
    const randNum = randomNumber(
      this.min_hourly_customers,
      this.max_hourly_customers
    );
    this.customers_per_hour.push(randNum);
  }
};

StoreLocation.prototype.calculateCookiesPerHour = function () {
  for (let i = 0; i < hours.length; i++) {
    const cookiesPerHour =
      this.avg_cookies_per_sale * this.customers_per_hour[i];

    this.avg_cookies_per_hour.push(Math.round(cookiesPerHour));
  }
};

StoreLocation.prototype.calculateSales = function () {
  this.calculateCustomersPerHour();
  this.calculateCookiesPerHour();
};

StoreLocation.prototype.render_table = function () {
  this.calculateSales();

  let salesTable = document.getElementById("sales-table-body");

  let tr = document.createElement("tr");
  tr.setAttribute("id", `sales_for_${this.location}`);

  salesTable.appendChild(tr);

  // let tr_id = document.getElementById(`sales_for_${this.location}`);

  const th = document.createElement("th");

  th.textContent = this.location;
  tr.appendChild(th);

  for (i = 0; i < hours.length; i++) {
    // table heading.
    const td = document.createElement("td");
    td.setAttribute("class", `${hours[i]}`);

    td.textContent = this.avg_cookies_per_hour[i];

    tr.appendChild(td);
  }
};

let sales = [
  new StoreLocation("Seattle", 23, 65, 6.3),
  new StoreLocation("Tokyo", 3, 24, 1.2),
  new StoreLocation("Dubai", 11, 38, 3.7),
  new StoreLocation("Paris", 20, 38, 2.3),
  new StoreLocation("Lima", 2, 16, 4.6),
];

function createStoreLocation(name, minCust, maxCust, avgCps) {
  let newStore = new StoreLocation(`${name}`, minCust, maxCust, avgCps);
  sales.push(newStore);
  refreshTableBody();
}

function deleteStoreLocation(name) {
  let locationFound = false;
  let locationIndex = null;

  for (let i = 0; i < sales.length; i++) {
    if (sales[i].location === name) {
      console.log("found");
      locationIndex = i;
      locationFound = true;
    }
  }

  if (locationFound) {
    console.log(`${name} deleted.`);
    sales.splice(locationIndex, 1, new StoreLocation("Deleted", 0, 0, 0));
  }

  refreshTableBody();
}

function renderTableHeader() {
  // this for loop will generate the hours on the table. The cell 'Location' is already included in the HTML.
  for (i = 0; i < hours.length; i++) {
    let salesHeader = document.getElementById("sales-table-header");

    // table heading.
    const th = document.createElement("th");

    th.textContent = hours[i];

    salesHeader.appendChild(th);
  }
}

function renderSales() {
  for (let i = 0; i < sales.length; i++) {
    sales[i].calculateSales();
  }
}

function refreshTableBody() {
  replaceTableBody();
  renderTableBody();
}

function replaceTableBody() {
  let tableElementsExist = document.getElementById("sales-table-body");

  tableElementsExist.textContent = "";
}

function renderTableBody() {
  let totalsArray = [];

  for (let i = 0; i < sales.length; i++) {
    sales[i].render_table();
  }

  // rendering the totals
  for (let x = 0; x < hours.length; x++) {
    let time = document.getElementsByClassName(`${hours[x]}`);
    let totalForTime = 0;

    for (let hour = 0; hour < time.length; hour++) {
      totalForTime += parseInt(time[hour].textContent);
    }

    totalsArray.push(totalForTime);
  }

  // pretty cheeky way of introducing a total, making it a store location.
  let totals = new StoreLocation("Totals", 0, 0, 0, [], totalsArray);
  totals.render_table();
}

// renderSales();

console.log(sales);

renderTableHeader();
renderTableBody();

// createStoreLocation("Manila", 20, 57, 4.8);

// credit to: https://stackoverflow.com/questions/13997793/generate-random-number-between-2-numbers
// ClearDiv function: https://www.tutorialspoint.com/how-to-clear-the-content-of-a-div-using-javascript
// https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
