const User = require("../models/user.model.js");
const Utilisateur = require('../models/user.model.js')

var mongoose = require("mongoose");
const { isAuthenticated } = require("../middlewares/auth.js");

// function findAll(req, res) {
//   User.find()
//     .then((users) => {
//       res.send(users);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message,
//       });
//     });
// }
// function updateUser(req, res) {
//   User.findByIdAndUpdate(
//     req.body._id,
//     {
//       discordId: req.body.discordId,
//       discordTag: req.body.discordTag,
//       avatar: req.body.avatar,
//       accessToken: req.body.accessToken,
//       refreshToken: req.body.refreshToken,
//       cards: req.body.cards,
//       claim_set: req.body.claim_set,
//       badges: req.body.badges,
//       boosters: req.body.boosters,
//       favorite: req.body.favorite,
//       score: req.body.score ? Math.floor(req.body.score) : req.body.score,
//       role: req.body.role,
//       verified: req.body.verified,
//     },
//     { new: true }
//   )
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           message: `user with id ${req.params.id} was not found`,
//         });
//       }
//       res.send(user);
//     })
//     .catch((err) => {
//       console.log(err);
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: `user with id ${req.params.id} was not found`,
//         });
//       }

//       return res.status(500).send({
//         message: `error updating user (id: ${req.params.id})`,
//       });
//     });
// }

//get the profile of a user with all info. (planner is simply a list of planners_id)
function getMyProfile(req, res) {
  User.findById(req.user._id).then(async (data) => {
    let response = (({ _id, googleId, avatar, username, planner }) => ({
      _id,
      googleId,
      username,
      avatar,
      planner,
    }))(data);
    return res.send(response);
  });
}




function getUserNameByID(req, res) {
  User.findById(req.params._id).then((user) => {
    res.send(user.username);
  });
}



//version Utilisateur model
function getMyUtilisateur(req, res) {
  Utilisateur.findById(req.user._id).then(async (data) => {
    let response = (({ _id, googleId, username, avatar, profile, name, nourriture }) => ({
      _id,
      googleId,
      username,
      avatar,
      profile,
      name,
      nourriture
    }))(data);
    return res.send(response);
  });
}

//function that modify the diet of an user
//inspired by updatePlanner
function modifyMyProfile(req, res) {
  let id = "";
  await Utilisateur.find().then((users) => {
    let user = users.find((user) => user.username == req.params.username);
    if (user) {
      id = user._id;
    }
    Utilisateur.findByIdAndUpdate(id).then((user) => {
      modifUser = user.find((user) => user.userId == req.body._id)
      if (modifUser) {
        modifUser.profile = req.body.profile
        res.status(200).send("Done");
      }
      else {
        res.send("error modifyMyProfile");
      }
    }
    )
  });
}
/*
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
*/

module.exports = {
  getMyProfile,
  getUserNameByID,
  getMyUtilisateur,
  modifyMyProfile
};
