
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")



mongoose.connect("mongodb+srv://taskapp:kvss%401199@cluster0.oqq9w.mongodb.net/wordle?retryWrites=true&w=majority");
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
