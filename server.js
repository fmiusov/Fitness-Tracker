// NPM IMPORTS
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const Workout = require("./models/Workout.js");

// CONNECTIONS AND MIDDLEWARE
const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev")); // Wasn't originally planning on using morgan but it became a life saver for debugging

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

//=========================================================================================================

// HTML ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});

//=========================================================================================================
// API ROUTES

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
  .then((dbWorkouts) => {
    res.json(dbWorkouts);
  })
  .catch((err) => {
    res.json(err);
  });
});

//=========================================================================================================

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
