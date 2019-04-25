const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose")
const db = require("./models")
const axios = require("axios")

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.get("/api/saved", (req, res) => {
  db.Book.find({})
    .then(dbBook => {
      res.json(dbBook)
    })
    .catch(err => {
      res.json(err)
    })
})

app.post("/api/saved", (req, res) => {
  console.log(req.body)
  db.Book.create({
    title: req.body.volumeInfo.title,
    authors: req.body.volumeInfo.authors[0],
    description: req.body.volumeInfo.description,
    image: req.body.volumeInfo.imageLinks.thumbnail,
    link: req.body.accessInfo.webReaderLink
  })
    .then(dbBook => {
      res.json(dbBook)
    })
    .catch(err => {
      res.json(err)
    })
})

app.post("/api/delete/:id", (req, res) => {
  db.Book.findById(req.params.id)
    .remove()
    .then(dbBook => {
      console.log(dbBook)
      res.json(dbBook)
    })
})

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});