const router = require("express").Router();
var path = require("path");
const Workout = require("../models/workout.js");
const mongojs = require("mongojs");


//route to "exercise.html" 
router.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/exercise.html"));
});

//route to "stats.html" (workout dashboard)
router.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/stats.html"))
});

//limit the rango to 7 days on the workout dashboard
router.get("/api/workouts/range", function(req, res){
    Workout.find({}).limit(7)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
})

//get work out info from the database
router.get("/api/workouts", function(req, res){
    Workout.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
})

//creates a new workout and adds to database
router.post("/api/workouts", function(req, res){
    console.log(req.body)
    Workout.create({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
})

//adds an exercise to the workout it belongs to using the unique _id
router.put("/api/workouts/:id", (req, res) => {
    Workout.update({_id: mongojs.ObjectId(req.params.id)}, {$push: {exercises: req.body}})
        .then(data => {
            res.json(data);
          })
          .catch(err => {
            res.json(err);
          });
});

module.exports = router;