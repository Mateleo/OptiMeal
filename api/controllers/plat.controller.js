const Plat = require("../models/plat.model.js");
const User = require("../models/user.model.js");

var mongoose = require("mongoose");
const { isAuthenticated } = require("../middlewares/auth.js");
const { listIndexes } = require("../models/plat.model.js");

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
  } else if (p == "adultLose") {
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
  let week = [];
  let weekapport = []
  for (let x = 0; x < 7; x++) {
    const db = await Plat.find().exec();
    apports = {
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
      let entr??e = db.filter((plat) => plat.type == "entr??e");
      entr??e = shuffleArray(entr??e);
      random_entr??e = entr??e.map((e) => {
        e.repas = shuffleArray(e.repas).slice(0, 1);
        return e;
      });
      let entr??e_diner = random_entr??e.find((e) => e.repas[0] == "diner");
      let entr??e_dej = random_entr??e.find((e) => e.repas[0] == "dej");
      console.log(apportsChecker(req.params.p, apports));

      if (entr??e_diner && !apportsChecker(req.params.p, apports)) {
        entr??e_diner.apports = Object.fromEntries(
          Object.entries(entr??e_diner.apports).map(([k, v]) => [k, v * 2])
        );
        apports.Calories += entr??e_diner.apports.Calories;
        apports.proteines += entr??e_diner.apports.proteines;
        apports.glucide += entr??e_diner.apports.glucide;
        apports.lipide += entr??e_diner.apports.lipide;
        random_plats.push(entr??e_diner);
        console.log(apports);
      }
      console.log(apportsChecker(req.params.p, apports));

      if (!apportsChecker(req.params.p, apports) && entr??e_dej) {
        entr??e_dej.apports = Object.fromEntries(
          Object.entries(entr??e_dej.apports).map(([k, v]) => [k, v * 2])
        );

        apports.Calories += entr??e_dej.apports.Calories;
        apports.proteines += entr??e_dej.apports.proteines;
        apports.glucide += entr??e_dej.apports.glucide;
        apports.lipide += entr??e_dej.apports.lipide;
        random_plats.push(entr??e_dej);
        console.log(apports);
      }
      console.log(apportsChecker(req.params.p, apports));

      let d??ssert = db.filter((plat) => plat.type == "dessert");
      d??ssert = shuffleArray(d??ssert);
      random_d??ssert = d??ssert.map((e) => {
        e.repas = shuffleArray(e.repas).slice(0, 1);
        return e;
      });
      let d??ssert_diner = random_d??ssert.find((e) => e.repas[0] == "diner");
      let d??ssert_dej = random_d??ssert.find((e) => e.repas[0] == "dej");
      let d??ssert_petit_dej = random_d??ssert.find((e) => e.repas[0] == "petit dej");

      console.log(apportsChecker(req.params.p, apports));

      if (d??ssert_diner && !apportsChecker(req.params.p, apports)) {
        d??ssert_diner.apports = Object.fromEntries(
          Object.entries(d??ssert_diner.apports).map(([k, v]) => [k, v * 1.5])
        );
        apports.Calories += d??ssert_diner.apports.Calories;
        apports.proteines += d??ssert_diner.apports.proteines;
        apports.glucide += d??ssert_diner.apports.glucide;
        apports.lipide += d??ssert_diner.apports.lipide;
        random_plats.push(d??ssert_diner);
        console.log(apports);
      }
      console.log(apportsChecker(req.params.p, apports));

      if (!apportsChecker(req.params.p, apports) && d??ssert_dej) {
        d??ssert_dej.apports = Object.fromEntries(
          Object.entries(d??ssert_dej.apports).map(([k, v]) => [k, v * 1.5])
        );
        apports.Calories += d??ssert_dej.apports.Calories;
        apports.proteines += d??ssert_dej.apports.proteines;
        apports.glucide += d??ssert_dej.apports.glucide;
        apports.lipide += d??ssert_dej.apports.lipide;
        random_plats.push(d??ssert_dej);
        console.log(apports);
      }
      console.log(apportsChecker(req.params.p, apports));

      if (!apportsChecker(req.params.p, apports) && d??ssert_petit_dej) {
        d??ssert_petit_dej.apports = Object.fromEntries(
          Object.entries(d??ssert_petit_dej.apports).map(([k, v]) => [k, v * 1.5])
        );
        apports.Calories += d??ssert_petit_dej.apports.Calories;
        apports.proteines += d??ssert_petit_dej.apports.proteines;
        apports.glucide += d??ssert_petit_dej.apports.glucide;
        apports.lipide += d??ssert_petit_dej.apports.lipide;
        random_plats.push(d??ssert_petit_dej);
        console.log(apports);
      }
      console.log(apportsChecker(req.params.p, apports));
      console.log(apports);
    }
    week.push(random_plats);
    weekapport.push(apports);
  }
  res.send([week,weekapport]);
}
module.exports = {
  randomMenu,
  findAllRepas,
};
