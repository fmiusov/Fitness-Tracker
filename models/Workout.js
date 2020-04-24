const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const opts = { toJSON: { virtuals: true } };
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: true,
      },
      name: {
        type: String,
        trim: true,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      },
    },
  ],
});

// My thought process for virtual (currently breaks app to implement)
//https://stackoverflow.com/questions/34470352/mongoose-take-sum-of-number-and-add-new-property-to-same-document
// WorkoutSchema.virtual("range").get(() => {
//   return this.duration.reduce(function (currentValue, previousValue) { //trying to use reduce to add up all the durations in the array
//     return parseInt(currentValue + previousValue);
//   });
// });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
