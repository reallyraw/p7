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
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!req.body.email.match(regexEmail)) {
      res.status(400).json({ error: "L'adresse mail n'est pas au bon format." })
    } else {
      let regexPassword = /^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/;
      if (!req.body.password.match(regexPassword)) {
      res.status(400).json({ error: "Le mot de passe doit faire au moins 8 caractères, contenir au moins une majuscule et un caractère spécial." })
      } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = {
            user_email: req.body.email,
            user_name: req.body.lastName,
            user_firstname: req.body.firstName,
            password: hash,
            user_pp: ``
          };
          const sql2 = "INSERT INTO users (user_email, user_name, user_firstname, password, user_pp) VALUES (?,?,?,?,?)";
          dbcon.query(sql2, [user.user_email, user.user_name, user.user_firstname, user.password, user.user_pp], function (err, result) {
          if (err) throw err;
          res.status(201).json({ message: `Nouvel utilisateur créé` });
          })
        })
        .catch(error => res.status(500).json( error ));
        }
      }
  } else {
    res.status(401).json({ error: "Il existe déjà un compte avec cette adresse mail." })
  }
  })
};

exports.login = (req, res, next) => {
  const sql = `SELECT * from users WHERE user_email = ?`;
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
      const sql = `SELECT * FROM users WHERE user_id = ?`;
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
              const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
              const user = {
                  user_pp: image,
              };
              
              const sql2 = `UPDATE users SET user_pp = ? WHERE user_id = ?`;
              dbcon.query(sql2, [user.user_pp, req.auth.userId], function (err, result) {
                  if (err) console.log(err);
                  res.status(201).json({ message: `Profil mis à jour` });
              });
          }
      });
  }
};

exports.getOneUser = (req, res, next) => {
  const sql = `SELECT user_name, user_firstname, user_firstname, user_pp from users WHERE user_id = ?`;
  dbcon.query(sql, req.params.id, function (err, result) {
      if (err) res.status(400).json({ err });
      res.status(200).json(result)
  });
};

exports.checkAdmin = (req, res, next) => {
  const sql = `SELECT user_admin from users WHERE user_id = ?`;
  dbcon.query(sql, req.auth.userId, function (err, result) {
      if (err) res.status(400).json({ err });
      if (result[0].user_admin === 1) {        
        res.status(200).json(true);
      } else {
        res.status(200).json(false);
      }
  });
};

exports.deleteAccount = (req, res, next) => {
  const sql = `DELETE FROM users WHERE user_id = ?`;
  dbcon.query(sql, req.auth.userId, function (err, result) {
    if (err) res.status(400).json({ err });
    const sql = `DELETE FROM posts WHERE post_id_author = ?`;
    dbcon.query(sql, req.auth.userId, function (err, result) {
      if (err) res.status(400).json({ err });
      const sql = `DELETE FROM comments WHERE comment_author = ?`;
      dbcon.query(sql, req.auth.userId, function (err, result) {
      });    
    });
    
    res.status(200).json(result)
});
}