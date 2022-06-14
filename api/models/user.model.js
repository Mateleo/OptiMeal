const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  planner: [{ type: String }],
});

module.exports = mongoose.model("User", UserSchema);
