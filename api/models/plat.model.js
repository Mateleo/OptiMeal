const mongoose = require("mongoose");

//model pour un repas
/*
const UserSchema = mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  planner: [{ type: String }],
});*/


const PlatSchema = mongoose.Schema({
	typeplat : { type: String },
	repas: [{ type : String }], //array of string
	apports: [{ type : Number }],
	recette: { type : String }
})
/*

// plus judicieux de le mettre dans user.model.js
const Agenda = mongoose.Schema({
  lundi : [ { matin : { type: PlatSchema }},
            { midi : { type: PlatSchema }},
            { soir : { type: PlatSchema }}],  
  mardi : [ { matin : { type: PlatSchema }},
            { midi : { type: PlatSchema }},
            { soir : { type: PlatSchema }}], 
  mercredi : [ { matin : { type: PlatSchema }},
               { midi : { type: PlatSchema }},
               { soir : { type: PlatSchema }}], 
  jeudi : [ { matin : { type: PlatSchema }},
            { midi : { type: PlatSchema }},
            { soir : { type: PlatSchema }}], 
  vendredi : [ { matin : { type: PlatSchema }},
               { midi : { type: PlatSchema }},
               { soir : { type: PlatSchema }}], 
  samedi : [ { matin : { type: PlatSchema }},
             { midi : { type: PlatSchema }},
             { soir : { type: PlatSchema }}], 
  dimanche : [ { matin : { type: PlatSchema }},
               { midi : { type: PlatSchema }},
               { soir : { type: PlatSchema }}], 
})

const UtilisateurSchema = mongoose.Schema({
	googleId: { type: String, required: true, unique: true},
  username: { type: String, required: true},
	avatar: {type : String, required: true},
	profile: {type : String, required: true},
	name: {type : String, required: true},
	nourriture: [{ type: Agenda }], //array 
  //nourriture: [{ type: Agenda }],
})*/

module.exports = mongoose.model("Plat", PlatSchema);
//module.exports = mongoose.model('Utilisateur', UtilisateurSchema);