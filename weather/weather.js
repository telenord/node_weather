const request = require('request');

//https://api.darksky.net/forecast/b0d6e805117b5e78c5dbf8cfb82e5afa/42.3601,-71.0589

const weatherFetch = (coords, cb) => {

  const {result:{lat, lng}} = coords;
  console.log(lat);
  request({
    url: `https://api.darksky.net/forecast/b0d6e805117b5e78c5dbf8cfb82e5afa/${lat},${lng}`,
    json: true

  }, (error, response, body) => {
    let result = '';

    if (error) {
      cb(error);
    }

    result = body.hourly;
    console.log('result', result);
    cb(null, {result});
  });
};


module.exports.weatherFetch = weatherFetch;
