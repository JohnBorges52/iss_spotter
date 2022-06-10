const request = require("request")

const fetchMyIP = function(callback) { 
  request("https://api.ipify.org/?format=json",(error, response, body) => {
    
      if (error) return callback(error, null);
  
      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
        return;
      }
  
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    });
} ;





const fetchCoordsByIP = function (ip, callback) {
  
  request(`https://api.ipbase.com/v2/info?apikey=kXd1oh2qH9MuEgKlJumDLF7d1TLCrDC1dG95Gixt&language=en&ip=${ip}`, (error, response, body) => {

    if (error){ 
      callback(error, null);
      return
    }
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const geo = JSON.parse(body)
    const latitude = geo.data.location.latitude
    const longitude = geo.data.location.longitude
    let geoLocation = {latitude, longitude} 
    callback (null, geoLocation);
  })
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error,response, body) => {
  
  if(error) callback(error,null);


  if (response.statusCode !== 200) {
    callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
    return;
  }

  const passes = JSON.parse(body).response
  
  callback (null, passes)

  })
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error,ip) => {
    if (error){
      return callback(error,null)
    }
    fetchCoordsByIP(ip,(error,loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc,(error,nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null,nextPasses)
      });
    });
 
  });
};

module.exports = {nextISSTimesForMyLocation}