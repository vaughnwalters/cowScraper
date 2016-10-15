const { get } = require('request');
const { load } = require('cheerio');
const [,, city, state] = process.argv;
const url =  `https://www.happycow.net/searchmap/?kw=&location=${city}+${state}&vegan=true`

console.log("city", city);
console.log("state", state);
console.log("url", url);

get(url, (err, res, body) => {
  let $ = load(body);
  let restaurantList = ($(".info h4")+"\n")
  let addressList = ($(".venue-location-item")+"\n")
  console.log("restaurantList", restaurantList);
  console.log("addressList", addressList);
})

  // process.stdout.write($(".info h4").text()+"\n")

