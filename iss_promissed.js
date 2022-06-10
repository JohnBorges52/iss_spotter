const { json } = require('mocha/lib/reporters');
const request = require('request-promise-native');

const fetchMyIP = function() { 
  return request("https://api.ipify.org/?format=json")
} ;
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://api.ipbase.com/v2/info?apikey=kXd1oh2qH9MuEgKlJumDLF7d1TLCrDC1dG95Gixt&language=en&ip=${ip}`)
};
const fetchISSFlyOverTimes = function(body) {
  let geo = JSON.parse(body)
  const latitude = geo.data.location.latitude;
  const longitude = geo.data.location.longitude;
 
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const response = JSON.parse(data).response;
        
    return response;

  });
};




module.exports = {nextISSTimesForMyLocation}