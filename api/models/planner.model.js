const mongoose = require("mongoose");

const UserPlanner = mongoose.Schema(
  {
    userId: { type: String },
    username: { type: String },
    datezone: [{ type: String }],
  },
  { _id: false }
);

const PlannerSchema = mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: UserPlanner }],
  link: { type: String },
});

module.exports = mongoose.model("Planner", PlannerSchema);
