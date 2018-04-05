const request = require('request');


const geocodeAddress = (address, cb) => {
  const encodedAddress = encodeURI(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDYpgwGNmVm1JxzdDIOSb5d6UWa54ANPBw`,
    json: true

  }, (error, response, body) => {
    let errorText;
    if (error) {
       cb(error);

    } else if (body.status === 'ZERO_RESULTS') {
      errorText = 'Unable to find that address';
       cb(errorText);
    }
    if (body.status === 'OK') {
      cb(null, body.results[0].geometry.location);
    }

  });
};


module.exports.geocodeAddress = geocodeAddress;
