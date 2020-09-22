const router = require("express").Router();
var path = require("path");
const Workout = require("../models/workout.js");
const mongojs = require("mongojs");

//route to "/exercise"
router.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/exercise.html"));
});

router.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/stats.html"))
});

router.get("/api/workouts/range", function(req, res){
    Workout.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
})

router.get("/api/workouts", function(req, res){
    Workout.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
})

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