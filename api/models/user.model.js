const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  profile: { type: String,required: true },
  age: { type: String, required:true },
});

module.exports = mongoose.model("User", UserSchema);
