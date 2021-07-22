const router = require("express").Router();
const Trainer = require("../models/Trainer.model");

// router.get("/", (req, res, next) => {
//   res.json("index");
// });

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

router.get('/trainers', (req, res, next) => {
  Trainer.find()
    .then(trainers => {
      console.log(trainers);
      res.json(trainers)
    })
    .catch(err => next(err))
});

router.post("/trainers", (req, res, next) => {
  const { name, imageUrl, age, styles, about } = req.body;
  Trainer.create({ name, imageUrl, age, styles, about })
    .then(trainer => {
      res.json(trainer)
    })
    .catch(err => next(err))
});

router.get('/trainers/:id', (req, res, next) => {
  Trainer.findById(req.params.id)
    .then(trainer => {
      if (!trainer) {
        res.status(404).json(trainer)
      } else {
      res.json(trainer)
      }
    })
    .catch(err => next(err))
});

router.put('/trainers/:id', (req, res, next) => {
  const { name, imageUrl, age, styles, about } = req.body;
  Trainer.findByIdAndUpdate(req.params.id, { name, imageUrl, age, styles, about }, { new: true })
    .then(trainer => {
      res.json(trainer)
    })
    .catch(err => next(err))
});

router.delete('/trainers/:id', (req, res, next) => {
  Trainer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ message: 'trainer removed' })
    })
    .catch(err => next(err))
});


module.exports = router;
