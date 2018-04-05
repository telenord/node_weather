const request = require('request');

const geocodeAddress = (address) => {
  const encodedAddress = encodeURI(address);
  return new Promise((resolve, reject)=>{
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDYpgwGNmVm1JxzdDIOSb5d6UWa54ANPBw`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to find that address')
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address')
      }
      if (body.status === 'OK') {
        resolve(body.results[0].geometry.location)
      }
    });
  })
};


module.exports.geocodeAddress = geocodeAddress;
