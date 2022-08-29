const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
const User = require("./models/User");

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const express = require("express");
const app = express();


  app.get("/", (req, res) => {
    const user = new User ({
      handle: "jim",
      email: "jim@jim.jim",
      password: "jimisgreat"
    })
    user.save();
    res.send("Booyah baby!")
  }); //app will listen for any get requests on the first argument, the root route
app.use("/api/users", users); //Any path that matches this route will send it to the route file
app.use("/api/tweets", tweets);

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);


const port = process.env.PORT || 5000; // if we are in production, use that port variable, else use 5000

app.listen(port, () => {console.log(`Listening on port ${port}`)});