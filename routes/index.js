const express = require('express');
const router = express.Router();
const axios = require('axios');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/', function (req, res, next) {

  const encodedAddress = encodeURI(req.body.address);
  const encodedAddressUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDYpgwGNmVm1JxzdDIOSb5d6UWa54ANPBw`;

  let result = '';

  axios.get(encodedAddressUrl)
    .then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address')
      }
      result = response.data.results[0].geometry.location;

      const weathrUrl = `https://api.darksky.net/forecast/b0d6e805117b5e78c5dbf8cfb82e5afa/${result.lat},${result.lng}`;
      return axios.get(weathrUrl);
    })
    .then((response) => {
      res.render('index', {result: result, temp: response.data.currently.temperature});
    })
    .catch((e) => {
      res.render('index', {errorText: e.message});
    })

});


module.exports = router;


