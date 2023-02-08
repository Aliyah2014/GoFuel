// DOM variables
var nearestStation = $('#nearestStation');
var regularDisplay = $('#regularDisplay');
var dieselDisplay = $('#dieselDisplay');

// Fuel Price Generator Function
var regular = 3;
var diesel = 4;
var randomCentsOne =  Math.floor(Math.random() * (999 - 001 + 1) + 001);
var randomCentsTwo =  Math.floor(Math.random() * (999 - 001 + 1) + 001);

function generateRegularPrice() {
  return `$${regular}.${randomCentsOne}`;
};

function generateDieselPrice() {
  return `$${diesel}.${randomCentsTwo}`;
};

// API call to NERL fuel
var userPostalCode = '80210';
var NERL_URL = `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?location=${userPostalCode}&limit=2&api_key=${NERL_KEY}`;

$.ajax({
  url: NERL_URL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  var stationName = response.fuel_stations[0].station_name;
  var stationAdd = response.fuel_stations[0].street_address;
  var stationZip = response.fuel_stations[0].zip;
  var stationNum = response.fuel_stations[0].station_phone;

  nearestStation.append(`${stationName}${stationAdd} ${stationZip}  ${stationNum}`);
  regularDisplay.append(generateRegularPrice());
  dieselDisplay.append(generateDieselPrice());
});

// MAPBOX
mapboxgl.accessToken = MAPBOX_KEY;

var map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-104.95121, 39.66758], // starting position [lng, lat]
  zoom: 12, // starting zoom
});

map.on('load', function () {
  map.resize();
});

// API call to get USA Gas prices
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.collectapi.com/gasPrice/stateUsaPrice?state=WA");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("authorization", "apikey 7MWEgB0tzpb27NRZrCuH4X:2Rbnr0TJ15XIVbS9igb95Y");

xhr.send(data);

// API autocomplete for search bar
// var apikey = 'HERE-e77eb534-79d2-43c3-aa17-373893adb761'

// https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json
// ?apiKey={'HERE-e77eb534-79d2-43c3-aa17-373893adb761'}
// &query=Pariser+1+Berl
// &beginHighlight=<b>
// &endHighlight=</b>