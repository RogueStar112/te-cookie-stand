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

// These two functions are combined, in calculateSales.
function calculateCustomersPerHour(obj) {
  for (let i = 0; i < hours.length; i++) {
    const randNum = randomNumber(
      obj.min_hourly_customers,
      obj.max_hourly_customers
    );
    obj.customers_per_hour.push(randNum);
  }
}

function calculateCookiesPerHour(obj) {
  for (let i = 0; i < hours.length; i++) {
    const cookiesPerHour = obj.avg_cookies_per_sale * obj.customers_per_hour[i];

    obj.avg_cookies_per_hour.push(Math.round(cookiesPerHour));
  }
}

function calculateSales(obj) {
  calculateCustomersPerHour(obj);
  calculateCookiesPerHour(obj);
}

/* Why is this in a list?

Because I do not want to create new locations by hand, so this is an easier way
of implementing sales.

*/
let sales = [
  {
    location: "Seattle",
    min_hourly_customers: 23,
    max_hourly_customers: 65,
    avg_cookies_per_sale: 6.3,
    customers_per_hour: [],
    avg_cookies_per_hour: [],
    total_cookies_sold: 0,
    calculateSales: function () {
      calculateSales(this);
    },
  },

  {
    location: "Tokyo",
    min_hourly_customers: 3,
    max_hourly_customers: 24,
    avg_cookies_per_sale: 1.2,
    customers_per_hour: [],
    avg_cookies_per_hour: [],
    total_cookies_sold: 0,
    calculateSales: function () {
      calculateSales(this);
    },
  },

  {
    location: "Dubai",
    min_hourly_customers: 11,
    max_hourly_customers: 38,
    avg_cookies_per_sale: 3.7,
    customers_per_hour: [],
    avg_cookies_per_hour: [],
    total_cookies_sold: 0,
    calculateSales: function () {
      calculateSales(this);
    },
  },

  {
    location: "Paris",
    min_hourly_customers: 20,
    max_hourly_customers: 38,
    avg_cookies_per_sale: 2.3,
    customers_per_hour: [],
    avg_cookies_per_hour: [],
    total_cookies_sold: 0,
    calculateSales: function () {
      calculateSales(this);
    },
  },

  {
    location: "Lima",
    min_hourly_customers: 2,
    max_hourly_customers: 16,
    avg_cookies_per_sale: 4.6,
    customers_per_hour: [],
    avg_cookies_per_hour: [],
    total_cookies_sold: 0,
    calculateSales: function () {
      calculateSales(this);
    },
  },
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

  for (i = 0; i < sales.length; i++) {
    let h2 = document.createElement("h2");
    h2.textContent = `${sales[i].location}`;
    salesList.appendChild(h2);

    const ul = document.createElement("ul");

    h2.appendChild(ul);

    let total = 0;

    for (x = 0; x < hours.length; x++) {
      let li = document.createElement("li");
      li.textContent = `${hours[x]}: ${sales[i].avg_cookies_per_hour[x]} cookies`;
      total += sales[i].avg_cookies_per_hour[x];

      ul.appendChild(li);
    }

    let li = document.createElement("li");
    li.textContent = `Total: ${total} cookies`;
    ul.appendChild(li);
  }
}

// this automatically generates the sales for each location
for (i = 0; i < sales.length; i++) {
  sales[i].calculateSales();
}

// this puts the sales for each location in the DOM;
generateSalesList();

// credit to: https://stackoverflow.com/questions/13997793/generate-random-number-between-2-numbers
