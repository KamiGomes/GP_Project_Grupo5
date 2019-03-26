// Import express
let express = require('express');
// Import FS
var rf = require("fs");
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Import mustacheExpress
var mustacheExpress = require('mustache-express');
// Initialize the app
let app = express();
// Import routes
let apiRoutes = require("./api-routes")

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views'); // you can change '/views' to '/public',
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true });

var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/administration', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});
