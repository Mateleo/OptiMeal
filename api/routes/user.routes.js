const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: "2mb" });

module.exports = function (app) {
  const user = require("../controllers/user.controller.js");
  const auth = require("../middlewares/auth.js");

  // app.get("/api/users", auth.isAuthenticated, user.findAll);
  // app.patch("/api/users", auth.isAuthenticated,urlencodedParser, user.updateUser);
  // app.patch("/api/users/claim/:discordId/:token",urlencodedParser, user.updateUserBooster);
  // app.patch(
  //   "/api/users/:discordId/:verified/:token",
  //   urlencodedParser,
  //   user.updateUserByDiscordId
  // );

  //new routes for S2
  app.get("/api/users/myprofile", auth.isAuthenticated, user.getMyProfile);
  app.get(
    "/api/users/name/:_id",
    auth.isAuthenticated,
    urlencodedParser,
    user.getUserNameByID
  );


  //routes set profile
  //mettre en place une fonction qui permettra de modifier du coup le régime alimentaire du profile connecté
  app.patch('/api/users/myprofile', auth.isAuthenticated, urlencodedParser, user.modifyMyProfile);

  // app.get("/api/users/myplanner", auth.isAuthenticated, user.getPlanner)
  // app.get("/api/users/myboosters", auth.isAuthenticated, user.getMyBoosters)
  // app.get("/api/users/set/:setname", auth.isAuthenticated, user.claimSet)
  // app.get("/api/users/leaderboard", auth.isAuthenticated, user.getLeaderboard)

  //pour le choix/modification du profile, updatePlanner ? 
  //app.patch('/api/users/modification', auth.isAuthenticated);

};
