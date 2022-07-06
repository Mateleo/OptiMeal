const Plat = require("../models/plat.model.js");
const User = require("../models/user.model.js");

var mongoose = require("mongoose");
const { isAuthenticated } = require("../middlewares/auth.js");

function findAllRepas(req, res) {
  Plat.find().then((plats) => res.send(plats));
}

const teenNormal = {
  Calories: 2700,
  proteines: 101,
  glucide: 280,
  lipide: 105,
};

const teenGain = {
  Calories: 3000,
  proteines: 121,
  glucide: 280,
  lipide: 105,
};

const teenLoss = {
  Calories: 2000,
  proteines: 101,
  glucide: 200,
  lipide: 80,
};

const adultNormal = {
  Calories: 2200,
  proteines: 72,
  glucide: 220,
  lipide: 76,
};

const adultGain = {
  Calories: 2900,
  proteines: 125,
  glucide: 280,
  lipide: 105,
};

const adultLose = {
  Calories: 1700,
  proteines: 90,
  glucide: 150,
  lipide: 60,
};

function apportsChecker(p, apports) {
  if (p == "teenNormal") {
    p = teenNormal;
    // console.log("adjusted");
  } else if (p == "adultNormal") {
    p = adultNormal;
  } else if (p == "teenGain") {
    p = teenGain;
  } else if (p == "teenLoss") {
    p = teenLoss;
  } else if (p == "adultGain") {
    p = adultGain;
  }
  else if (p == "adultLose") {
    p = adultLose;
  }
  if (
    p.Calories > apports.Calories ||
    p.proteines > apports.proteines ||
    p.glucide > apports.glucide ||
    p.lipide > apports.lipide
  ) {
    return false;
  }
  return true;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function randomMenu(req, res) {
  const db = await Plat.find().exec();
  let apports = {
    Calories: 0,
    proteines: 0,
    glucide: 0,
    lipide: 0,
  };
  random_plats = [];
  while (!apportsChecker(req.params.p, apports)) {
    apports = {
      Calories: 0,
      proteines: 0,
      glucide: 0,
      lipide: 0,
    };
    let plats = db.filter((plat) => plat.type == "plat");
    plats = shuffleArray(plats);
    random_plats = plats.slice(0, 3);
    random_plats = random_plats.map((e) => {
      e.repas = shuffleArray(e.repas).slice(0, 1);
      return e;
    });
    random_plats_tester = random_plats[0].repas.concat(
      random_plats[1].repas,
      random_plats[2].repas
    );
    while (
      !random_plats_tester.includes("diner") ||
      !random_plats_tester.includes("dej") ||
      !random_plats_tester.includes("petit dej")
    ) {
      plats = shuffleArray(plats);
      random_plats = plats.slice(0, 3);
      random_plats = random_plats.map((e) => {
        e.repas = shuffleArray(e.repas).slice(0, 1);
        if (e.repas[0] == "petit dej") {
          e.apports.Calories *= 0.3;
        }
        return e;
      });
      random_plats_tester = random_plats[0].repas.concat(
        random_plats[1].repas,
        random_plats[2].repas
      );
      console.log(random_plats_tester);
    }

    random_plats[0].apports = Object.fromEntries(
      Object.entries(random_plats[0].apports).map(([k, v]) => [k, v * 3])
    );
    random_plats[1].apports = Object.fromEntries(
      Object.entries(random_plats[1].apports).map(([k, v]) => [k, v * 3])
    );
    random_plats[2].apports = Object.fromEntries(
      Object.entries(random_plats[2].apports).map(([k, v]) => [k, v * 3])
    );
    apports.Calories =
      random_plats[0].apports.Calories +
      random_plats[1].apports.Calories +
      random_plats[2].apports.Calories;
    apports.proteines =
      random_plats[0].apports.proteines +
      random_plats[1].apports.proteines +
      random_plats[2].apports.proteines;
    apports.glucide =
      random_plats[0].apports.glucide +
      random_plats[1].apports.glucide +
      random_plats[2].apports.glucide;
    apports.lipide =
      random_plats[0].apports.lipide +
      random_plats[1].apports.lipide +
      random_plats[2].apports.lipide;

    console.log(apports);
    let entrée = db.filter((plat) => plat.type == "entrée");
    entrée = shuffleArray(entrée);
    random_entrée = entrée.map((e) => {
      e.repas = shuffleArray(e.repas).slice(0, 1);
      return e;
    });
    let entrée_diner = random_entrée.find((e) => e.repas[0] == "diner");
    let entrée_dej = random_entrée.find((e) => e.repas[0] == "dej");
    console.log(apportsChecker(req.params.p, apports));

    if (entrée_diner && !apportsChecker(req.params.p, apports)) {
      entrée_diner.apports = Object.fromEntries(
        Object.entries(entrée_diner.apports).map(([k, v]) => [k, v * 2])
      );
      apports.Calories += entrée_diner.apports.Calories;
      apports.proteines += entrée_diner.apports.proteines;
      apports.glucide += entrée_diner.apports.glucide;
      apports.lipide += entrée_diner.apports.lipide;
      random_plats.push(entrée_diner);
      console.log(apports);
    }
    console.log(apportsChecker(req.params.p, apports));

    if (!apportsChecker(req.params.p, apports) && entrée_dej) {
      entrée_dej.apports = Object.fromEntries(
        Object.entries(entrée_dej.apports).map(([k, v]) => [k, v * 2])
      );

      apports.Calories += entrée_dej.apports.Calories;
      apports.proteines += entrée_dej.apports.proteines;
      apports.glucide += entrée_dej.apports.glucide;
      apports.lipide += entrée_dej.apports.lipide;
      random_plats.push(entrée_dej);
      console.log(apports);
    }
    console.log(apportsChecker(req.params.p, apports));

    let déssert = db.filter((plat) => plat.type == "dessert");
    déssert = shuffleArray(déssert);
    random_déssert = déssert.map((e) => {
      e.repas = shuffleArray(e.repas).slice(0, 1);
      return e;
    });
    let déssert_diner = random_déssert.find((e) => e.repas[0] == "diner");
    let déssert_dej = random_déssert.find((e) => e.repas[0] == "dej");
    let déssert_petit_dej = random_déssert.find((e) => e.repas[0] == "petit dej");

    console.log(apportsChecker(req.params.p, apports));

    if (déssert_diner && !apportsChecker(req.params.p, apports)) {
      déssert_diner.apports = Object.fromEntries(
        Object.entries(déssert_diner.apports).map(([k, v]) => [k, v * 1.5])
      );
      apports.Calories += déssert_diner.apports.Calories;
      apports.proteines += déssert_diner.apports.proteines;
      apports.glucide += déssert_diner.apports.glucide;
      apports.lipide += déssert_diner.apports.lipide;
      random_plats.push(déssert_diner);
      console.log(apports);
    }
    console.log(apportsChecker(req.params.p, apports));

    if (!apportsChecker(req.params.p, apports) && déssert_dej) {
      déssert_dej.apports = Object.fromEntries(
        Object.entries(déssert_dej.apports).map(([k, v]) => [k, v * 1.5])
      );
      apports.Calories += déssert_dej.apports.Calories;
      apports.proteines += déssert_dej.apports.proteines;
      apports.glucide += déssert_dej.apports.glucide;
      apports.lipide += déssert_dej.apports.lipide;
      random_plats.push(déssert_dej);
      console.log(apports);
    }
    console.log(apportsChecker(req.params.p, apports));

    if (!apportsChecker(req.params.p, apports) && déssert_petit_dej) {
      déssert_petit_dej.apports = Object.fromEntries(
        Object.entries(déssert_petit_dej.apports).map(([k, v]) => [k, v * 1.5])
      );
      apports.Calories += déssert_petit_dej.apports.Calories;
      apports.proteines += déssert_petit_dej.apports.proteines;
      apports.glucide += déssert_petit_dej.apports.glucide;
      apports.lipide += déssert_petit_dej.apports.lipide;
      random_plats.push(déssert_petit_dej);
      console.log(apports);
    }
    console.log(apportsChecker(req.params.p, apports));
    console.log(apports);
  }
  res.send(random_plats);
}

//tous les plats
//la première boucle c'est pour itérer les jours, la deuxième pour itérerer matin midi soir
// function findRepas(req, res) {
//   let AllPlatsDay = [];
//   let AllPlats = [AllPlatsDay];
//   console.log(req.params._nourriture);
//   Utilisateur.findById(req.params._nourriture).then(async (user) => {
//     if (user && user.nourriture) {
//       for (let x = 0; x < user.nourriture.length; x++) {
//         let responsex = await Utilisateur.findById(user.nourriture[x]).exec();
//         for (let y = 0; y < user.nourriture[x].length; y++) {
//           let responsey = await Utilisateur.findById(user.nourriture[x][y]).exec();
//           AllPlatsDay.push(responsey);
//         }
//         AllPlats.push(responsex);
//       }
//       res.send(AllPlats);
//     } else {
//       res.send("Impossible de trouver les repas");
//     }
//   });
// }

//fonction visant à trouver les repas d'un jour en particulier
//utilisateur n'a pas été importé
// function findRepasDay(req, res) {
//   let AllPlatsDay = [];
//   let Day = req.params.day;
//   console.log(req.params._nourriture);
//   Utilisateur.findById(req.params._nourriture).then(async (user) => {
//     //remplace la variable Day selon ce qu'on souhaite
//     //switch peut être enlevé si la variable day est deja un nombre
//     /*switch (req.params.day) {
//       case 'Lundi':
//         Day = 0
//         break;
//       case 'Mardi':
//         Day = 1
//         break;
//       case 'Mercredi':
//         Day = 2
//         break;
//       case 'Jeudi':
//         Day = 3
//         break;
//       case 'Vendredi':
//         Day = 4
//         break;
//       case 'Samedi':
//         Day = 5
//         break;
//       case 'Dimanche':
//         Day = 6
//         break;
//       default:
//         console.log(`Sorry, error on the switch case`);
//     }*/
//     if (user && user.nourriture) {
//       for (let y = 0; y < user.nourriture[Day].length; y++) {
//         let response = await Utilisateur.findById(user.nourriture[Day][y]).exec();
//         AllPlatsDay.push(response);
//       }

//       res.send(AllPlatsDay);
//     } else {
//       res.send("Impossible");
//     }
//   });
// }

//fonction visant à trouver le repas d'une journée en particulier
//donc selon l'argument day + argument repas (pti-dej, etc.)

// function findRepasDaySpecific(req, res) {
//   let Repas;
//   let Day = req.params.day;
//   let Moment = req.params.moment;
//   console.log(req.params._nourriture);
//   Utilisateur.findById(req.params._nourriture).then(async (user) => {
//     if (user && user.nourriture) {
//       let response = await Utilisateur.findById(user.nourriture[Day][Moment]).exec();
//       Repas = response;
//       res.send(Repas);
//     } else {
//       res.send("Impossible");
//     }
//   });
// }

//trouver un plat en particulier

module.exports = {
  randomMenu,
  findAllRepas,
  // findRepas,
  // findRepasDay,
  // findRepasDaySpecific,
};
