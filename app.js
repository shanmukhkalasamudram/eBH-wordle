
// Import necessary packages
/*const express = require(“express”);
const bodyParser = require(“body-parser”);

// create and configure the express app
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// Database Connection Info
const MongoClient = require(“mongodb”).MongoClient;

// the URL we copied from earlier. Replace username and password with what you created in the initial steps
const url = “mongodb://sweetgame:sweetgame1@ds135156.mlab.com:35156/sweetgame”;
let db;

// The index route
app.get(“/”, function(req, res) {
   res.send(“Sweet Game Leaderboard API!”);
});

// Connect to the database with [url]
(async () => {
   let client = await MongoClient.connect(
       url,
       { useNewUrlParser: true }
   );

   db = client.db(“Players”);

   app.listen(PORT, async function() {
       console.log(`Listening on Port ${PORT}`);
       if (db) {
           console.log(“Database is Connected!”);
       }
   });
})();*/



var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")



mongoose.connect("mongodb://localhost/wordle");
mongoose.Promise = global.Promise;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/*app.use("/booking", booking);
app.use("/hotels", hotels);
app.use("/rooms", rooms);
app.use("/users", users);*/

app.use(express.Router().get('/', (req, res) => { res.send('<h1>Wordle Game</h1>'); }));
app.use(express.Router().get('/api', (req, res) => { res.send('<h1>API System</h1>'); }));
app.use('/api', require('./routes/users'));

// error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});


/*app.get("/", function (req, res) {

    res.render("landing");

});*/

/*router.get('/hotels', (req, res, next) => {
    // Hotel.find({name: req.query.hotelName})
    // .then( hotels => res.send(hotels));
    Hotel.find({ name: req.body.name })
        .populate('rooms')
        .exec((err, hotels) => {
            if (err) { res.send({ error: err.message }) }
            else { res.send(hotels) }
        });
});
*/
var port = 7000;
app.listen(port, function () {
    console.log("Wordle Server is running!");
});