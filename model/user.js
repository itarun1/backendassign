const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  occupation: {
    type: String,
  },
},{
timestamps: true 
});

userSchema.methods.checkpass = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  let hash = bcryptjs.hashSync(this.password, 8);
  this.password = hash;
  return next();
});
module.exports = mongoose.model('User', userSchema);
