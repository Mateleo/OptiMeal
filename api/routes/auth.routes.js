module.exports = function (app) {
  const passport = require("passport");
  app.get(
    "/api/auth/google",
    passport.authenticate("google", {
      scope: ["openid", "profile"],
    })
  );
  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/failed" }),
    function (req, res) {
      // Successful authentication, redirect home.
      if (process.env.NODE_ENV == "production") {
        res.redirect("https://notenoughcards.netlify.app/mypanel");
      } else {
        res.redirect("http://localhost:3000/mypanel");
      }
    }
  );
  app.get("/api/auth/", (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else {
      res.status(401).send({ msg: "Unauthorized" });
    }
  });
};
