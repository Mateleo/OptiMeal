const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: "2mb" });

module.exports = function (app) {
  const Plat = require("../controllers/plat.controller.js");
  //const Plat = require("../models/plat.model.js");
  const user = require("../controllers/user.controller.js");
  const auth = require("../middlewares/auth.js");


  //app.put("/api/planner", auth.isAuthenticated, urlencodedParser, planner.createPlanner);

  //route visant à get l'entiereté des plats
  //app.get("/api/plat", Plat.findAllPlats);// auth.isAuthenticated, planner.findAllPlanner);
  //,(req,res) => res.json({ message: "route get plat" }));
  

  //vise à renvoyer l'entiereté des plats
  /*
  app.get("/api/plat" //);// auth.isAuthenticated);
  , async (req,res) => {
    try{
      const plats = await Plat.find();
      res.json(plats)
    }catch(err){
      res.json({message: err});
    }
  });*/
  app.get('/api/plat' , Plat.findAllRepas, auth.isAuthenticated);
  
  //un plat en particulier
  app.get("/api/plat/:_id"//);// auth.isAuthenticated);
  ,(req,res) => res.json({ message: "route get plat id" }));

  //get l'emploi du temps de nourriture
  app.get("/api/:_nourriture", auth.isAuthenticated, Plat.findRepas);

  //get un jour en particulier du planning nourriture
  app.get('/api/:_nourriture/:day', auth.isAuthenticated, Plat.findRepasDay)


  //get jour + moment de la journée du planning nourriture
  app.get('/api/:_nourriture/:day/:moment', auth.isAuthenticated, Plat.findRepasDaySpecific)


  //get un emploi du temps généré aléatoirement

  //un jour particulier
  //app.get("/api/nourriture/:_id", auth.isAuthenticated);

/*
  app.patch(
    "/api/planner/:link",
    auth.isAuthenticated,
    urlencodedParser,
    planner.updatePlanner
  );
  app.patch(
    "/api/planner/join/:link",
    auth.isAuthenticated,
    urlencodedParser,
    planner.joinPlanner
  );*/
};