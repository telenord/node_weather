const request = require('request');


const geocodeAddress = (address, cb) => {
  const encodedAddress = encodeURI(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDYpgwGNmVm1JxzdDIOSb5d6UWa54ANPBw`,
    json: true

  }, (error, response, body) => {
    let result = '';
    let errorText;
    if (error) {
      return cb(error);

    } else if (body.status === 'ZERO_RESULTS') {
      errorText = 'Unable to find that address';
      return cb(errorText);
    }
    if (body.status === 'OK') {
      result = body.results[0].geometry.location;
    }
    return cb(null, {result});
  });
};


module.exports.geocodeAddress = geocodeAddress;
