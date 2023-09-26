/*
let sales_seattle = {

  min_hourly_customers: 23,
  max_hourly_customers: 65,
  avg_cookies_per_customer = 6.3;

  generateCustomers = function () {
    
    // added +1 to generate 1 to 10 customers
    new_customers = Math.random(Math.floor() * 10) + 1



  }
};
*/

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

StoreLocation.prototype.render = function () {
  // write the code that adds the sales data onto the page in this function
  // similar to your generateSalesList function, but this time it will only be for a single location
  // change list to table, but ONLY after you've done the app.js code.

  let salesList = document.getElementById("sales-list");

  // resets the list
  // salesList.replaceChildren();
  let h2 = document.createElement("h2");
  h2.textContent = `${this.location}`;
  salesList.appendChild(h2);

  const ul = document.createElement("ul");

  h2.appendChild(ul);

  for (x = 0; x < hours.length; x++) {
    let li = document.createElement("li");
    li.textContent = `${hours[x]}: ${this.avg_cookies_per_hour[x]} cookies`;
    this.total_cookies_sold += this.avg_cookies_per_hour[x];

    ul.appendChild(li);
  }

  let li = document.createElement("li");
  li.textContent = `Total: ${this.total_cookies_sold} cookies`;
  ul.appendChild(li);
};

let sales = [
  new StoreLocation("Seattle", 23, 65, 6.3),
  new StoreLocation("Tokyo", 3, 24, 1.2),
  new StoreLocation("Dubai", 11, 38, 3.7),
  new StoreLocation("Paris", 20, 38, 2.3),
  new StoreLocation("Lima", 2, 16, 4.6),
];

function generateLocation(
  location_name,
  min_customers,
  max_customers,
  avg_cookies
) {
  sales.push({
    location: location_name,
    min_hourly_customers: min_customers,
    max_hourly_customers: max_customers,
    avg_cookies_per_sale: avg_cookies,
    customers_per_hour: [],
    avg_cookies_per_hour: [],
    total_cookies_sold: 0,
    calculateSales: function () {
      calculateSales(this);
    },
  });

  return {
    location: location_name,
    min_hourly_customers: min_customers,
    max_hourly_customers: max_customers,
    avg_cookies_per_sale: avg_cookies,
  };
}

function generateSalesList() {
  let salesList = document.getElementById("sales-list");

  // resets the list
  // salesList.replaceChildren();

  for (i = 0; i < sales.length; i++) {
    let h2 = document.createElement("h2");
    h2.textContent = `${sales[i].location}`;
    salesList.appendChild(h2);

    const ul = document.createElement("ul");

    h2.appendChild(ul);

    for (x = 0; x < hours.length; x++) {
      let li = document.createElement("li");
      li.textContent = `${hours[x]}: ${sales[i].avg_cookies_per_hour[x]} cookies`;
      sales[i].total_cookies_sold += sales[i].avg_cookies_per_hour[x];

      ul.appendChild(li);
    }

    let li = document.createElement("li");
    li.textContent = `Total: ${sales[i].total_cookies_sold} cookies`;
    ul.appendChild(li);
  }
}

// this automatically generates the sales for each location
for (i = 0; i < sales.length; i++) {
  sales[i].calculateSales();
  sales[i].render();
}

// this puts the sales for each location in the DOM;
// generateSalesList();

// credit to: https://stackoverflow.com/questions/13997793/generate-random-number-between-2-numbers
