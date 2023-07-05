var express = require("express");
var router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "hospitalDB";

router.get("/", (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      return console.error(err, "Koneksi Gagal!");
    }
    const db = client.db(dbName);

    const visitorsCollection = db.collection("visitors");

    // Read all data
    visitorsCollection
      .find()
      .toArray()
      .then((result) => {
        res.status(200).json(result);
      });

    client.close();
  });
});

router.post("/", (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      return console.error(err, "Koneksi Gagal!");
    }

    const db = client.db(dbName);

    const visitorsCollection = db.collection("visitors");

    visitorsCollection.insertOne(req.body).then((result) => {
      console.log(result);
    });

    client.close();
  });

  res.status(200).json("Data successfully saved");
});

router.get("/:id", (req, res) => {
  console.log("ini param", req.params.id);
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);

    const visitorsCollection = db.collection("visitors");

    visitorsCollection
      .findOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      });

    client.close();
  });
});

module.exports = router;
