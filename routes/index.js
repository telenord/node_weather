const express = require('express');
const router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/', function (req, res, next) {

  const encodedAddress = encodeURI(req.body.address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDYpgwGNmVm1JxzdDIOSb5d6UWa54ANPBw`,
    json: true

  }, (error, response, body) => {
    let result= '';
    let errorText;
    if (error) {
      errorText = error;

    } else if (body.status === 'ZERO_RESULTS') {
      errorText = 'Unable to find that address';
    }
    if (body.status === 'OK') {
      result = body.results[0].geometry.location;
    }
    result = result ? {result} : {errorText};

    console.log(result);

    res.render('index', result );
  });


});
module.exports = router;
