const Plat = require("../models/plat.model.js");
const User = require("../models/user.model.js");

var mongoose = require("mongoose");
const { isAuthenticated } = require("../middlewares/auth.js");

//trouver tous les plats
//à modifier, pas fonctionnel, j'ai opté pour un simple find
/*function findAllPlats(req, res) {
    let AllPlats = [];
    console.log(req.params._id);
    Plat.findById(req.params._id).then(async (plat) => {
      if (true) {//(user && user.plat) {
        for (let x = 0; x < plat.length; x++) {
          let response = await Plat.findById(user.plat[x]).exec();
          AllPlats.push(response);
        }
        res.send(AllPlats);
      } else {
        res.send("Impossible");
      }
    });
}*/


//cette fonction vise à retourner l'entiereté des repas de la semaine (l'array avec lundi, mardi etc. dans Utilisateur model)
//les repas de la semaine pour un Utilisateur en particulier

// function findAllRepas(req,res){
//     try{
//       const plats = await Plat.find();
//       res.json(plats)
//     }catch(err){
//       res.json({message: err});
//     }
//   }


//tous les plats
//la première boucle c'est pour itérer les jours, la deuxième pour itérerer matin midi soir
function findRepas(req, res){
  let AllPlatsDay = []
  let AllPlats = [AllPlatsDay];
  console.log(req.params._nourriture);
  Utilisateur.findById(req.params._nourriture).then(async (user) => {
    if (user && user.nourriture) {
      for (let x = 0; x < user.nourriture.length; x++) {
        let responsex = await Utilisateur.findById(user.nourriture[x]).exec();
        for (let y = 0; y < user.nourriture[x].length; y++) {
          let responsey = await Utilisateur.findById(user.nourriture[x][y]).exec();
          AllPlatsDay.push(responsey);
        }
        AllPlats.push(responsex);
      }
      res.send(AllPlats);
    } else {
      res.send("Impossible de trouver les repas");
    }
  });
}

//fonction visant à trouver les repas d'un jour en particulier  
//utilisateur n'a pas été importé 
function findRepasDay(req, res){
  let AllPlatsDay = [];
  let Day = req.params.day;
  console.log(req.params._nourriture);
  Utilisateur.findById(req.params._nourriture).then(async (user) => {
    //remplace la variable Day selon ce qu'on souhaite
    //switch peut être enlevé si la variable day est deja un nombre
    /*switch (req.params.day) {
      case 'Lundi':
        Day = 0
        break;
      case 'Mardi':
        Day = 1
        break;
      case 'Mercredi':
        Day = 2
        break;
      case 'Jeudi':
        Day = 3
        break;
      case 'Vendredi':
        Day = 4
        break;
      case 'Samedi':
        Day = 5
        break;
      case 'Dimanche':
        Day = 6
        break;
      default:
        console.log(`Sorry, error on the switch case`);
    }*/
    if (user && user.nourriture) {
        for (let y = 0; y < user.nourriture[Day].length; y++) {
          let response = await Utilisateur.findById(user.nourriture[Day][y]).exec();
          AllPlatsDay.push(response);
        }
      
      res.send(AllPlatsDay);
    } else {
      res.send("Impossible");
    }
  });
}

//fonction visant à trouver le repas d'une journée en particulier
//donc selon l'argument day + argument repas (pti-dej, etc.)

function findRepasDaySpecific(req, res){
  let Repas;
  let Day = req.params.day;
  let Moment = req.params.moment
  console.log(req.params._nourriture);
  Utilisateur.findById(req.params._nourriture).then(async (user) => {
    if (user && user.nourriture) {
          let response = await Utilisateur.findById(user.nourriture[Day][Moment]).exec();
          Repas = response;
      res.send(Repas);
    } else {
      res.send("Impossible");
    }
  });
}

//trouver un plat en particulier


module.exports = {
    // findAllRepas,
    findRepas,
    findRepasDay,
    findRepasDaySpecific
};