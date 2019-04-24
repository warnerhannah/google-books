const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose")
const db = require("./client/models/index")

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.get("/api/books", (req,res) => {
  db.Book.find({})
  .then(dbBook => {
    res.json(dbBook)
  })
  .catch(err => {
    res.json(err)
  })
})



// app.get("/api/members", (req, res) => {
//   db.Member.find({})
//   .then(dbMember =>{
//     res.json(dbMember)
//   })
//   .catch(err => {
//     res.json(err)
//   })
// })

// app.post("/api/new", (req, res) => {
//   console.log(req)
//   db.Member.create(req.body)
//   .then(dbMember => {
//     res.json(dbMember)
//   })
//   .catch(err => {
//     res.json(err)
//   })
// })


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {useNewUrlParser: true});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});