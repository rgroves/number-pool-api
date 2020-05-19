// Load configuration environment variables
require("dotenv").config();
const port = process.env.APP_PORT;
const databaseUri = process.env.DB_CONN;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/user/create/:email", (req, res) => {
  // Connect to database
  const client = new MongoClient(databaseUri, { useNewUrlParser: true });

  client.connect((err) => {
    const collection = client.db("test").collection("users");
    collection.insertOne({ email: req.params.email }, {}, (err, results) => {
      if (!err) {
        res.send(results);
      } else {
        res.send("Error in GET request." + err);
      }
    });
  });

  client.close();
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
