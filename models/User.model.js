const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  password: String,
  name: String,
  role: {
    type: String,
    enum: ['user', 'trainer'],
    default: 'user'
  } 
});

const User = model("User", userSchema);

module.exports = User;
