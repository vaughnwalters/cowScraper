"use strict";

const { get } = require('request');
const { load } = require('cheerio');
const [,, city, state] = process.argv;
const url =  `https://www.happycow.net/searchmap/?kw=&location=${city}+${state}&vegan=true`


if ( city === undefined || state === undefined) {
  process.stdout.write(`
    YO \n
    YOLO \n
  `)
} else {
  Promise.resolve()
  .then(() => madLogzBro())
  .then(() => scrapeAndReturn())
}

let madLogzBro = () => {
  console.log("city", city);
  console.log("state", state);
  // console.log("url", url);
}

const scrapeAndReturn = () => {
  get(url, (err, res, body) => {
    let $ = load(body);
    
    let restaurantList = ($(".venue-name")+"")
    restaurantList = restaurantList.replace(/<\/h5>/g, "")
    let restNameArr = restaurantList.split('<h5 class="group inner list-group-item-heading venue-name">');
    restNameArr.shift();

    let addressList = $(".venue-location-item").text();
    let restAddressArr = addressList.split(', USA');
    restAddressArr.pop();
    
    // console.log("restNameArr", restNameArr);
    // console.log("restAddressArr", restAddressArr);

    let restaurantArr;
    if (restAddressArr.length === restNameArr.length) {
      for (let i = 0; i < restAddressArr.length; i++) {
          let restInfo = restNameArr[i] + ", " + restAddressArr[i];
          restInfo = restInfo.replace(/&apos;/g, "'");
          process.stdout.write(restInfo+"\n");
        }
    } else if (restAddressArr.length > restNameArr.length) {
      console.log("more restaurant addresses than names.  problem on happy cow's end.");
    } else if (restAddressArr.length < restNameArr.length) {
      console.log("more restaurant names than addresses.  problem on happy cow's end."); 
    }
  })
}
