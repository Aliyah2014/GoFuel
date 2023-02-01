// API call to NERL
var userPostalCode = '80210';
var API_URL = `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?location=${userPostalCode}&limit=2&api_key=${API_KEY}`;

$.ajax({
  url: API_URL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});
