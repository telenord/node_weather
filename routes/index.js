const express = require('express');
const router = express.Router();



const geocode = require('../geocode/geocode');
const weather = require('../weather/weather');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/', function (req, res, next) {

  geocode.geocodeAddress(req.body.address, (error, result)=>{
    if (error){
      res.render('index', {errorText: error});
    }
    weather.weatherFetch(result, (error, weather)=>{
      if (error){
        res.render('index', {errorText: error});
      }
      res.render('index', {weather});
    });

    res.render('index', result);
  });

});


module.exports = router;
