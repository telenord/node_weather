const request = require('request');

const weatherFetch = (coords, cb) =>{
  if(!coords) return;
  const {lat, lng} = coords;
  return new Promise((resolve, reject)=>{
    request({
      url: `https://api.darksky.net/forecast/b0d6e805117b5e78c5dbf8cfb82e5afa/${lat},${lng}`,
      json: true
    }, (error, response, body) => {
      if (response.statusCode===200){
        resolve(body.currently.temperature)
      } else {
        reject('Unable to fetch temp.')
      }
    });

  })
};

module.exports.weatherFetch = weatherFetch;
