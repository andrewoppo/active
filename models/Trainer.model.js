const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
  name: String,
  imageUrl: String,
  age: Number,
  styles: [],
  about: String,
  timeSlots: [],
  owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }
});

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
