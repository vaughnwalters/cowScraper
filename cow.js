"use strict";

const { get } = require('request');
const { load } = require('cheerio');
const [,, city, state] = process.argv;
const url =  `https://www.happycow.net/searchmap/?kw=&location=${city}+${state}&vegan=true`

const restaurantArr = [];
const addressArr = [];


console.log("city", city);
console.log("state", state);
console.log("url", url);



get(url, (err, res, body) => {
  let $ = load(body);
  let restaurantList = ($(".venue-name").text()+"\n")
  let addressList = $(".venue-location-item").text();
  let addressSplit = addressList.split(', USA')
  addressSplit.pop()
  console.log("restaurantList", restaurantList);
  console.log("addressSplit", addressSplit);
})

