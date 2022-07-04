const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  profile: { type: String,required: true },
  age: { type: String, required:true },
});

// type PlatSchema ? 
const Agenda = mongoose.Schema({
  lundi : [ { matin : { type: String }},
            { midi : { type: String }},
            { soir : { type: String }}],  
  mardi : [ { matin : { type: String }},
            { midi : { type: String }},
            { soir : { type: String }}],
  mercredi : [ { matin : { type: String }},
               { midi : { type: String }},
               { soir : { type: String }}],
  jeudi : [ { matin : { type: String }},
            { midi : { type: String }},
            { soir : { type: String }}],
  vendredi : [ { matin : { type: String }},
               { midi : { type: String }},
               { soir : { type: String }}],
  samedi : [ { matin : { type: String }},
             { midi : { type: String }},
             { soir : { type: String }}],
  dimanche : [ { matin : { type: String }},
               { midi : { type: String }},
               { soir : { type: String }}]
})

const UtilisateurSchema = mongoose.Schema({
	googleId: { type: String, required: true, unique: true},
  username: { type: String, required: true},
	avatar: {type : String, required: true},
	profile: {type : String, required: true},
	name: {type : String, required: true},
	nourriture: { type: Agenda }, 
  //nourriture: [{ type: Agenda }],
})


module.exports = mongoose.model("User", UserSchema);
module.exports = mongoose.model('Utilisateur', UtilisateurSchema)