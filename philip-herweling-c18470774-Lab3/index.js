const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const cookieParser = require('cookie-parser');


const app = express();

// This sets up the pug files directory
app.set('view engine', 'pug');
app.set('views','./views');

// Sets up the public directory which contains JavaScript and CSS files 
app.use(express.static('public'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

// This file is which contains each colour route 
const colours = require('./colours.js');

// Routing all requests to the colours file 
app.use('/colours', colours);

// Renders a page if the route choosen by the user isn't found
app.get('*', function(req, res){
    res.render('error');
});


// Listening on port 8080
app.listen(8080, () => {console.log("Server started: http://localhost:8080/colours");
});