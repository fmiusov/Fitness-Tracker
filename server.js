// NPM IMPORTS
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")
const Workout = require("./models/Workout.js");

// CONNECTIONS AND MIDDLEWARE
const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev")); // Wasn't originally planning on using morgan but it became a life saver for debugging

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });
//=========================================================================================================

// HTML ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"))
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"))
});


//=========================================================================================================
// API ROUTES

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});
//=========================================================================================================


app.get("/user", (req, res) => {
  db.User.find({})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/submit", ({ body }, res) => {
  db.Note.create(body)
    .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populateduser", (req, res) => {
  db.User.find({})
    .populate("notes")
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
