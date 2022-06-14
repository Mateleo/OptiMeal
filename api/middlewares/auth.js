module.exports = {
    isAuthenticated: function(req, res, next){
      req.user ? next() : res.status(403).send("Unauthorized");
    },
  };
  