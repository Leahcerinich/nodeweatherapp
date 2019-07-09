const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = 'b090866d5a537a6980369da6cb8213d4';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function(req, res){ 
  res.render('index', {weather: null, error: null});
})
app.post('/', function (req, res){
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  request(url, function(err, response, body) {
    if(err) {
      res.render('index', {weather: null, error: 'error, please try again'});
    } else {
      let weather = JSON.parse(body);
      //console.log(weather);
      if (weather.main == undefined) {
        res.render('index', { weather: null, error: 'Error , please try again'});
      } else {
        let weatherText = `it's ${weather.main.temp} degrees on ${weather.name}!`;
        res.render('index', { weather: weatherText, error: null});
      }
    }
  });
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080')
})