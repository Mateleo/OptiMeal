const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const Store = require("connect-mongo");
var compression = require("compression");
require("dotenv").config();
require("./strategies/google.js");

const bodyParser = require("body-parser");

const uri =
  "mongodb+srv://MastercampBdd:" +
  process.env.PASSWORD +
  "@cluster0.ljgxm.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Mastercamp_Bdd",
  })
  .then(() => {
    console.log("Database connected");
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
    console.log("Could not connect to MongoDB");
  });

app.set("trust proxy", 1);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    domain: "http://notenoughcards.netlify.app",
    cookie: {
      maxAge: 3600 * 1000 * 24 * 4, // 4 jours de co
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // must be 'none' to enable cross-site delivery
      secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    },
    store: Store.create({ mongoUrl: uri, dbName: "Mastercamp_Bdd" }),
  })
);

let whitelist = [
  "http://localhost:3000",
  "http://localhost:5001",
  "https://pland-efrei.netlify.app/",
  "http://pland-efrei.netlify.app/",
];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false, credentials: true }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// only allow fetch request from our vue server s
app.use(cors(corsOptionsDelegate));

app.use(passport.initialize());
app.use(passport.session());

app.use(compression());

//require routes
// require("./routes/planner.routes")(app);
require("./routes/user.routes")(app);
require("./routes/auth.routes")(app);
// require('./routes/plat.routes')(app);

// parse requests of content-type - app/json
// app.use(express.json())

// parse requests of content-type - app/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }))

//docker test trigger

// create a simple route
app.get("/", (req, res) => {
  res.json({ message: "server is up and running !" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server has started");
});
