const router = require("express").Router();
const Trainer = require("../models/Trainer.model");


router.get('/', (req, res, next) => {
  Trainer.find()
    .then(trainers => {
      console.log(trainers);
      res.json(trainers)
    })
    .catch(err => next(err))
});

router.post('/add', (req, res, next) => {
  //add styles back in:
  const { name, imageUrl, age, about } = req.body;
  console.log(req.body)
  //add styles back
  Trainer.create({ name, imageUrl, age, about })
    .then(trainer => {
      res.status(200).json(trainer)
    })
    .catch(err => {
      console.log(err);
      });
});

router.get('/:id', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
  const { name, imageUrl, age, styles, about } = req.body;
  Trainer.findByIdAndUpdate(req.params.id, { name, imageUrl, age, styles, about }, { new: true })
    .then(trainer => {
      res.json(trainer)
    })
    .catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
  Trainer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ message: 'trainer removed' })
    })
    .catch(err => next(err))
});

module.exports = router;
