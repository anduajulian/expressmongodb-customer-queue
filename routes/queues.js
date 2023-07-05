var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");

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

    const queuesCollection = db.collection("queues");

    // Read all data
    queuesCollection
      .find()
      .toArray()
      .then((result) => {
        res.status(200).json(result);
      });

    client.close();
  });
});

router.get("/newest", (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      return console.error(err, "Koneksi Gagal!");
    }
    const db = client.db(dbName);

    const queuesCollection = db.collection("queues");

    // Read all data
    queuesCollection
      .find()
      .sort({ $natural: -1 })
      .limit(1)
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

    const queuesCollection = db.collection("queues");

    queuesCollection.insertOne(req.body).then((result) => {
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

    const queuesCollection = db.collection("queues");

    queuesCollection.findOne({ queue: req.params.id }).then((result) => {
      res.status(200).json(result);
    });

    client.close();
  });
});

module.exports = router;
