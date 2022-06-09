// login, signup, updateProfile

const dbcon = require('../config/db');
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.signup = (req, res, next) => {
  let sql = `SELECT * FROM users WHERE user_email=?`;
  dbcon.query(sql, [req.body.email], function (err, result) {
  let user = result[0];
  if (!user) {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = {
        user_email: req.body.email,
        user_name: req.body.lastName,
        user_firstname: req.body.firstName,
        password: hash,
        user_pp: `${req.protocol}://${req.get('host')}/images/default.png`
      };
      var sql2 = "INSERT INTO users (user_email, user_name, user_firstname, password, user_pp) VALUES (?,?,?,?,?)";
      dbcon.query(sql2, [user.user_email, user.user_name, user.user_firstname, user.password, user.user_pp], function (err, result) {
      if (err) throw err;
      res.status(201).json({ message: `Nouvel utilisateur créé` });
      })
    })
    .catch(error => res.status(500).json( error ));
  } else {
    res.status(401).json({ error: "Il existe déjà un compte avec cette adresse mail." })
  }
  })
};

exports.login = (req, res, next) => {
  var sql = `SELECT * from users WHERE user_email = ?`;
    dbcon.query(sql, [req.body.email], function (err, result) {
      if (!result[0]) {
        return res.status(401).json({ error: 'Utilisateur non trouvé.' });
      }
      bcrypt.compare(req.body.password, result[0].password)
        .then(function(check) {
          if (!check) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
          }
          res.status(200).json({
            userId: result[0].user_id,
            token: jwt.sign(
              { userId: result[0].user_id },
              process.env.TOKEN,
              { expiresIn: '24h' }
            )
          });
         })
        .catch(error => res.status(500).json( error ));
  });
};


exports.updateProfile = (req, res, next) => {
  if (req.file) {
      var sql = `SELECT * FROM users WHERE user_id = ?`;
      dbcon.query(sql, [req.auth.userId], function (err, result) {
          if (err) res.status(400).json({ e });
          if (!result) res.status(400).json({ error: "Aucun utilisateur correspondant." });
          else {
              if (result[0].user_pp != "") {
                  const name = result[0].user_pp.split('/images/')[1];
                  fs.unlink(`images/${name}`, () => {
                      if (err) console.log(err);
                      else console.log('Image de profil modifiée !');
                  })
              }
              var image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
              const user = {
                  user_pp: image,
              };
              
              var sql2 = `UPDATE users SET user_pp = ? WHERE user_id = ?`;
              dbcon.query(sql2, [user.user_pp, req.auth.userId], function (err, result) {
                  if (err) console.log(err);
                  res.status(201).json({ message: `Profil mis à jour` });
              });
          }
      });
  }
};

exports.getOneUser = (req, res, next) => {
  var sql = `SELECT user_name, user_firstname, user_firstname, user_pp from users WHERE user_id = ?`;
  dbcon.query(sql, req.params.id, function (err, result) {
      if (err) res.status(400).json({ err });
      res.status(200).json(result)
  });
};

exports.checkUserAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };  
    
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).json({ error: "Vous ne pouvez pas accéder à cette page, veuillez vous connecter." });
    } else {
      res.status(201).json({ message: `Vous êtes déjà connecté(e). Veuillez vous déconnecter avant d'accéder à cette page.` });
    }
  } catch (err) {
    res.status(401).json({
      error: err.message
    });
  }
}