const request = require("request")

request(`https://api.ipbase.com/v2/info?apikey=kXd1oh2qH9MuEgKlJumDLF7d1TLCrDC1dG95Gixt&language=en&ip=24.69.200.19`, (error, response, body) => {

    if (error){ 
      return
    }
    
       const x = JSON.parse(body)
       const latitude = x.data.location.latitude
       const longitude = x.data.location.longitude
      console.log({latitude, longitude});
  })