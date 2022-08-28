const express = require("express");
const app = express(); // will give back the app obj that we can then configure

const mongoose = require ('mongoose');
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  app.get("/", (req, res) => {
      res.send("Booyah baby!")
    }); //app will listen for any get requests on the first argument, the root route
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
app.use("/api/users", users);
app.use("/api/tweets", tweets);

const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000; // if we are in production, use that port variable, else use 5000

app.listen(port, () => {console.log(`Listening on port ${port}`)});