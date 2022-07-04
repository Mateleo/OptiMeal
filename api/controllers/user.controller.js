const User = require("../models/user.model.js");

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
  User.findById(req.user._id).then((user) => {
    return res.send(user);
  });
}

function getUserNameByID(req, res) {
  User.findById(req.params._id).then((user) => {
    res.send(user.username);
  });
}

function updateProfile(req, res){
  console.log(req.body)
  User.findById(req.body._id).then((user)=>{
    user.profile = req.body.profile,
    user.age = req.body.age
    user.save()
  })
  res.sendStatus(200)
}

module.exports = {
  getMyProfile,
  getUserNameByID,
  updateProfile
};
