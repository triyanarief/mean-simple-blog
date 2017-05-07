const express = require('express');
const app = express();

const passport      = require('passport');
const cookieParser  = require('cookie-parser');
const session       = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');


let bodyParser = require('body-parser');
app.use(bodyParser.json({type: 'website/json'}));
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require ("./test/app.js")(app);

require("./assignment/app.js")(app);
require("./ejs/hello/app.js")(app);

let websites = [
    {_id: 321, name: 'facebook.com', uid: 123},
    {_id: 432, name: 'wikipedia.org', uid: 123},
    {_id: 543, name: 'twitter.com', uid: 234}
];

app.get("/websites", (req, res) => {
    res.send(websites);
});

require("./experiments/app.js")(app);
require("./lecture/app.js")(app);
require("./sandbox/todo/app.js")(app);
require("./experiments/todo/app.js")(app);
require("./sandbox/http/proxy")(app);
require("./sandbox/ejs/forms/app.js")(app);

require("./ejs/forms/app")(app);

require("./ejs/math/app")(app);

require("./sandbox/wax/app")(app);

require("./wax/app")(app);

// require("./sandbox/websites/model/test.model.server")(app);

const ipaddress = process.env.OPENSHIFT_NODEJS_IP;
const port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
