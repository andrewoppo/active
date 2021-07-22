require("dotenv/config");

const MONGO_URI = process.env.MONGODB_URI;

const mongoose = require('mongoose');
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

  const Trainer = require('./models/Trainer.model')

  const trainers = [
    {
        name: "Ham Johnson",
        imageUrl: "https://www.personalfitness.de/images/cache/trainer-3562-mobile.jpg",
        age: 28,
        styles: ['HIIT', 'power-lifting'],
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa aliquid totam possimus asperiores delectus optio. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates omnis inventore nobis.",
    },
    {
        name: "Lisa Davis",
        imageUrl: "https://sillse.com/img/functional-training.jpg",
        age: 28,
        styles: ['HIIT', 'pilates'],
        about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa aliquid totam possimus asperiores delectus optio. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates omnis inventore nobis.",
    }
  ]

  Trainer.insertMany(trainers)
    .then(trainers => {
        console.log('Trainers added successfully:', trainers);
        mongoose.connection.close();
    })
    .catch(err => console.log(err));