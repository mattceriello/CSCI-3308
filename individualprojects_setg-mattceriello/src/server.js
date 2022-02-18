// Load the modules
var express = require('express'); //Express - a web application framework that provides useful utility functions like 'http'
var app = express();
var bodyParser = require('body-parser'); // Body-parser -- a library that provides functions for parsing incoming requests
app.use(bodyParser.json());              // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
const axios = require('axios');
const qs = require('query-string');

var pgp = require('pg-promise')();
const dev_dbConfig = {
  host: 'db',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user:  process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
};

const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// Heroku Postgres patch for v10
// fixes: https://github.com/vitaly-t/pg-promise/issues/711
if (isProduction) {
  pgp.pg.defaults.ssl = {rejectUnauthorized: false};
}

var db = pgp(dbConfig);

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));// Set the relative path; makes accessing the resource directory easier


// Home page - DON'T CHANGE
app.get('/', function(req, res) {
  res.render('pages/main', {
    my_title: "Itunes search",
    items: '',
    error: false,
    message: ''
  });
});

app.get('/main', function(req, res) {
  res.render('pages/main', {
    my_title: "Song search",
    items: '',
    error: false,
    message: ''
  });
});

app.get('/reviews', function(req, res) {
  var reviews_query = 'select * from song_reviews;';

  db.any(reviews_query)
      .then(function (rows) {
        res.render('pages/reviews', {
          my_title: "Song reviews",
          items: rows,
          error: false,
          message: ''
        })

      })
      .catch(function (err) {
        console.log('error', err);
        res.render('pages/reviews', {
          my_title: "Song reviews",
          items: '',
          error: true,
          message: ''
        })
      })
});




//to request data from API for given search criteria
//TODO: You need to edit the code for this route to search for movie reviews and return them to the front-end
app.post('/search', function(req, res) {
  var title = req.body.title; //TODO: Remove null and fetch the param (e.g, req.body.param_name); Check the NYTimes_home.ejs file or console.log("request parameters: ", req) to determine the parameter names
  //var api_key = 'FtaaPrvbqXMI5bMixR9BMLXvg3A0XemR'; // TOOD: Remove null and replace with your API key you received at the setup
  console.log(title);
  var parameterkeyvalue = 'term=' + title + '&entity=song&limit=1';
  if(title) {
    axios({
      url: 'https://itunes.apple.com/search?' + parameterkeyvalue,
        method: 'GET',
        dataType:'json',
      })
        .then(items => {
          console.log(items.data.results)
          // TODO: Return the reviews to the front-end (e.g., res.render(...);); Try printing 'items' to the console to see what the GET request to the Twitter API returned.
          // Did console.log(items) return anything useful? How about console.log(items.data.results)?
          // Stuck? Look at the '/' route above
          res.render('pages/main',{
            my_title: "NYTimes Movie Reviews",
            items: items.data.results,
            error: false,
            message: ''
    			})

        })
        .catch(error => {
          console.log(error);
          res.render('pages/main',{
            my_title: "NYTimes Movie Reviews",
            items: '',
            error: true,
            message: error
          })
        });


  }
  else {
    // TODO: Render the home page and include an error message (e.g., res.render(...);); Why was there an error? When does this code get executed? Look at the if statement above
    // Stuck? On the web page, try submitting a search query without a search term
    res.render('pages/main',{
      my_title: "NYTimes Movie Reviews",
      items: '',
      error: true,
      message: 'Please enter a valid title!'
    })
  }
});

app.post('/review', function(req, res) {
  date = new Date();
  date = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  track_id = req.body.trackid;
  song_name = req.body.songname;
  review = req.body.review;
  var insert_statement = `INSERT INTO song_reviews(track_id, song_name, review, review_date) VALUES(${track_id},'${song_name}','${review}','${date}');`;
  var reviews_query = 'select * from song_reviews;';
  db.task('get-everything', task => {
    return task.batch([
      task.any(insert_statement),
      task.any(reviews_query)
    ]);
  })
  .then(function (item) {
    res.render('pages/reviews.ejs', {
      my_title: "Song reviews",
      items: item[1],
      error: false,
      message: ''
    })

  })
  .catch(function (err) {
    console.log('error', err);
    res.render('pages/main.ejs', {
      my_title: "Song reviews",
      items: '',
      error: true,
      message: 'Error.'
    })
  })
});


app.post('/filter_reviews', function(req, res) {
  var search_term = req.body.reviewtitle;
  var reviews_query = "select * from song_reviews WHERE LOWER(song_name) LIKE LOWER('%"+ search_term +"%');"; // Write a SQL query to retrieve the color message for the selected color

  db.any(reviews_query)
      .then(function (rows) {
        res.render('pages/reviews.ejs', {
          my_title: "Song reviews",
          items: rows,
          error: false,
          message: ''
        })

      })
      .catch(function (err) {
        console.log('error', err);
        res.render('pages/reviews.ejs', {
          my_title: "Song reviews",
          items: '',
          error: true,
          message: ''
        })
      })
});



//app.listen(3000);
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
console.log('3000 is the magic port');
