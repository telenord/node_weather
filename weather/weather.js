const request = require('request');

const weatherFetch = (coords, cb) => {
  if(!coords) return;
  const {lat, lng} = coords;

  request({
    url: `https://api.darksky.net/forecast/b0d6e805117b5e78c5dbf8cfb82e5afa/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      cb(error);
    }else if(response.statusCode===400){
      cb('Unable to fetch temp.');
    }
    else if(response.statusCode===200){
      cb(null, body.currently.temperature);
    }
  });
};

module.exports.weatherFetch = weatherFetch;
