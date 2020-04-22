const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

// const Recipe = require("./models/Recipe");
// const Ingredient = require("./models/Ingredient");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const Exercise = require("./public/exercise.js");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.post("/api/workouts", (req, res) => {
  Exercise.create(req.body)
    .then((createdExercise) => {
      res.json(createdExercise);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json(err);
    });
});

// app.post("/api/recipes", (req, res) => {
//   Recipe.create(req.body)
//     .then((createdRecipe) => {
//       res.json(createdRecipe);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500);
//       res.json(err);
//     });
// });

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
