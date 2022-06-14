const Planner = require("../models/planner.model.js");

var mongoose = require("mongoose");
const User = require("../models/user.model.js");
const { isAuthenticated } = require("../middlewares/auth.js");

//create a simple planner and ad it to the creator
function createPlanner(req, res) {
  const planner = new Planner({
    name: req.body.name,
    users: req.body.users,
    link: req.body.link,
  });

  planner.save().catch((err) => {
    console.log(err);
  });
  console.log(planner._id.toString());
  User.findById(planner.users[0].userId).then(async (user) => {
    user.planner.push(planner._id.toString());
    user.save();
  });
}

//find all planers for a given user, and send them back
function findAllPlanner(req, res) {
  let AllPlaner = [];
  console.log(req.params._id);
  User.findById(req.params._id).then(async (user) => {
    if (user && user.planner) {
      for (let x = 0; x < user.planner.length; x++) {
        let response = await Planner.findById(user.planner[x]).exec();
        AllPlaner.push(response);
      }
      res.send(AllPlaner);
    } else {
      res.send("Impossible");
    }
  });
}

async function updatePlanner(req, res) {
  let id = "";
  await Planner.find().then((planners) => {
    let planner = planners.find((planner) => planner.link == req.params.link);
    if (planner) {
      id = planner._id;
    }
  });
  Planner.findByIdAndUpdate(id).then((planner) => {
    plannerUser = planner.users.find((user) => user.userId == req.body._id);
    if (plannerUser) {
      plannerUser.datezone = req.body.datezone;
    }
    planner.users = planner.users.filter((user) => user.userId !== req.body._id);
    planner.users.push(plannerUser);
    planner.save();
    res.status(200).send("Done");
  });
}

async function joinPlanner(req, res) {
  let plannerId = "";
  console.log(req.body);
  if (req.body == undefined) {
    res.send("This user does not exist");
    return;
  }
  await Planner.find().then((planners) => {
    if (planners.find((planner) => planner.link == req.params.link)) {
      //the link is correspond to a valid planner
      plannerId = planners.find((planner) => planner.link == req.params.link)._id;
      User.findById(req.body._id)
        .then((user) => {
          if (!user.planner.includes(plannerId)) {
            user.planner.push(plannerId);
            user.save();
            res.send("You have joined this planner");
          } else {
            res.send("You have this planner !");
          }
        })
        .catch((err) => res.send("Can't find user"));
    } else {
      res.send("This planner does not exist");
    }
  });
  Planner.findByIdAndUpdate(plannerId).then((planner) => {
    planner.users.push({
      username: req.body.username,
      userId: req.body._id,
      dateZone: [],
    });
    planner.save();
  });
}

module.exports = {
  createPlanner,
  findAllPlanner,
  updatePlanner,
  joinPlanner,
};
