const express = require('express');
const router = express.Router();
const fs = require('fs');

// Read in the colours provided to us for this lab which is stored
// in the data folder
let colours = JSON.parse(fs.readFileSync('./data/colours.json', 'utf8'));

/*
    GET: /colours
    This Route will gets all the colours and then displays them to the user
*/
router.get('/', function(req, res){
    let cookie = req.cookies['colour'];
    res.render('index', {colours: colours, cookie: cookie});
});

// This renders the create colour form
router.get('/create', function(req, res){
    res.render('create');
});

// This render the update colour form
router.get('/update/:id', function(req, res){

    let curColour = colours.filter(function(colour){
        if(colour.colorId == req.params.id){
            return true;
        }
    });

    if(curColour.length === 1){
        res.render('update', {colour: curColour[0]});
    } else {
        res.status(404);
        res.json({ message: 'Colour Not Found' });
    }
});

/*
    GET: /colours/:id
    This Route retrieves a colour based on the id provided by the user
*/
router.get('/:id', function(req, res){

    let curColour = colours.filter(function(colour){
        if(colour.colorId == req.params.id){
            return true;
        }
    });

    if(curColour.length === 1){
        res.render('view', {colour: curColour[0]});
    } else {
        res.status(404);
        res.json({ message: 'Colour Not Found' });
    }
});

/* 
    POST: /colours
    This Route adds a colour to the file
*/
router.post('/', function(req, res){

    // Create an ID for the new colour using the last colour in the JSON object
    let colourID = colours[colours.length - 1].colorId + 1;

    // Push the new colour file to the JSON object with the specified details
    colours.push({
        colorId: colourID,
        name: req.body.name,
        hexString: req.body.hexString,
        rgb: {
            r: req.body.r,
            g: req.body.g,
            b: req.body.b
        },
        hsl: {
            h: req.body.h,
            s: req.body.s,
            l: req.body.l
        },
    });
    res.status(200).json({ message: 'Colour Created' });
});

/* 
    PUT: /colours/:id
    This route will update an existing colour from the file or if no colour 
    exists with the id provided, a new colour will be created instead
*/
router.put('/:id', function(req, res){

    // Retrieve the colour from the object with the id provided
    let colourIndex = colours.map(function(colour){
        return colour.colorId;
    }).indexOf(parseInt(req.params.id));

    // If no colour exists with the provided id, it creates it
    if(colourIndex === -1){

        // Creats a unique id for the new colour using the last colour id in the JSON object and adds one to that
        let colourID = colours[colours.length - 1].colorId + 1;

        colours.push({
            colorId: colourID,
            name: req.body.name,
            hexString: req.body.hexString,
            rgb: {
                r: req.body.r,
                g: req.body.g,
                b: req.body.b
            },
            hsl: {
                h: req.body.h,
                s: req.body.s,
                l: req.body.l
            },
        });
        res.json({ message: 'New Colour Created' });
    // If a colour was found which matchs the provided id, this updates said colour     
    } else {

        updateID = parseInt(req.body.id);

        colours[colourIndex] = {
            colorId: updateID,
            name: req.body.name,
            hexString: req.body.hexString,
            rgb: {
                r: req.body.r,
                g: req.body.g,
                b: req.body.b
            },
            hsl: {
                h: req.body.h,
                s: req.body.s,
                l: req.body.l
            }
        }
        res.json({ message: 'Existing Colour Updated' });
    }
});

/* 
    DELETE: /colours/:id
    This Route will delete a colour if it exists in the file
*/
router.delete('/:id', function(req, res){

    // Trys to retrieve the colour from the object with the provided id
    let colourIndex = colours.map(function(colour){
        return colour.colorId;
    }).indexOf(parseInt(req.params.id));

    // If the colour doesn't exist show a message, or else delete it from the file
    if(colourIndex === -1){
        res.json({ message: 'Colour Not Found' });
    } else {
        colours.splice(colourIndex, 1);
        res.json({ message: 'Colour Deleted' });
    }
});

router.post('/setColour/:id', function(req, res){

    // Sets the cookie to the colour choosen by the user
    colours.filter(function(colour){
        if(colour.colorId == req.params.id){
            res.cookie('colour', colour.hexString);
            return true;
        }
    });

    res.json({ message: 'Success' });
});

module.exports = router;