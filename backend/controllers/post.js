// getAllPosts, createPost, deletePost, modifyPost, getOnePost

const dbcon = require('../config/db');
const fs = require("fs");

exports.getAllPosts = (req, res, next) => {
    const sql = `SELECT user_id, user_name, user_firstname, user_pp, post_id, post_id_author, post_date_created, post_description, post_likes, post_image
            FROM posts 
            INNER JOIN users 
            ON posts.post_id_author = users.user_id
            ORDER BY posts.post_date_created DESC`;
    dbcon.query(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
};

exports.createPost = (req, res, next) => {
    const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
    const text = (req.body.text) ? req.body.text : " ";
    const post = {
        post_id_author: req.auth.userId,
        post_date_created: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" }),
        post_description: text,
        post_image: image,
        post_likes: 0,
    };
    const sql = "INSERT INTO posts (post_id_author, post_date_created, post_description, post_image, post_likes) VALUES (?,?,?,?,?)";
    dbcon.query(sql, [post.post_id_author, post.post_date_created, post.post_description, post.post_image, post.post_likes], function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: `Post ajouté` });
    })
}

exports.deletePost = (req, res, next) => {
    const sql = `SELECT * FROM posts WHERE post_id = ?`;
    dbcon.query(sql, [req.params.id], function (err, result) {
        if (err) res.status(400).json({ err });
        if (!result[0]) res.status(400).json({ message: "Aucun post correspondant" });
        else {
            if (result[0].post_image != "") {
                const name = result[0].post_image.split('/images/')[1];
            }
            if (result[0].post_id_author == req.auth.userId) {
                fs.unlink(`images/${name}`, () => {
                    if (err) console.log(err);
                    else console.log('Image supprimée  !');
                })
                const sql2 = `DELETE FROM posts WHERE post_id = ?`;
                dbcon.query(sql2, [req.params.id], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: `Post supprimé` });
                });
            } else {
                const sql2 = `SELECT * FROM users WHERE user_id = ?`;
                dbcon.query(sql2, [req.auth.userId], function (err, result) {     
                    if (result[0].user_admin === 1) {
                        fs.unlink(`images/${name}`, () => {
                            if (err) console.log(err);
                            else console.log('Image supprimée  !');
                        })        
                        const sql3 = `DELETE FROM posts WHERE post_id = ?`;
                        dbcon.query(sql3, [req.params.id], function (err, result) {
                            if (err) throw err;
                            res.status(201).json({ message: `Post supprimé` });
                        });
                      } else {    
                        res.status(401).json({message : "Vous n'avez pas l'autorisation."});
                      }
                })
            }
        }
    });
};

exports.updatePost = (req, res, next) => {
    const sql = `SELECT * FROM posts WHERE post_id = ?`;
    dbcon.query(sql, [req.params.id], function (err, result) {
        if (err) res.status(400).json({ e });
        if (!result[0]) res.status(400).json({ message: "Aucun post correspondant" });
        else {
            if (req.file) {		
                if (result[0].post_image != "") {
                    const name = result[0].post_image.split('/images/')[1];
                }
                const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
                const post = {
                    post_description: req.body.text,
                    post_image: image,
                };
                if (result[0].post_id_author == req.auth.userId) {         
                    fs.unlink(`images/${name}`, () => {
                        if (err) console.log(err);
                        else console.log('Image modifiée !');
                    })           
                    const sql2 = `UPDATE posts SET post_description = ?, post_image= ? WHERE post_id = ?`;
                    dbcon.query(sql2, [post.post_description, post.post_image, req.params.id], function (err, result) {
                        if (err) throw err;
                        res.status(201).json({ message: `Post mis à jour` });
                    });
                } else {
                    const sql2 = `SELECT * FROM users WHERE user_id = ?`;
                    dbcon.query(sql2, [req.auth.userId], function (err, result) {     
                        if (result[0].user_admin === 1) {     
                            fs.unlink(`images/${name}`, () => {
                                if (err) console.log(err);
                                else console.log('Image modifiée !');
                            })   
                            const sql3 = `UPDATE posts SET post_description = ?, post_image= ? WHERE post_id = ?`;
                            dbcon.query(sql3, [post.post_description, post.post_image, req.params.id], function (err, result) {
                                if (err) throw err;
                                res.status(201).json({ message: `Post mis à jour` });
                            });
                          } else {    
                            res.status(401).json({message : "Vous n'avez pas l'autorisation."});
                          }
                    })
                }
            } else {
                if (result[0].post_id_author == req.auth.userId) {   
                    const sql2 = `UPDATE posts SET post_description = ? WHERE post_id = ?`;
                    dbcon.query(sql2, [req.body.text, req.params.id], function (err, result) {
                        if (err) throw err;
                        res.status(201).json({ message: `Post mis à jour` });
                    });
                } else {
                    const sql2 = `SELECT * FROM users WHERE user_id = ?`;
                    dbcon.query(sql2, [req.auth.userId], function (err, result) {     
                        if (result[0].user_admin === 1) {     
                            const sql3 = `UPDATE posts SET post_description = ? WHERE post_id = ?`;
                            dbcon.query(sql3, [req.body.text, req.params.id], function (err, result) {
                                if (err) throw err;
                                res.status(201).json({ message: `Post mis à jour` });
                            });
                          } else {    
                            res.status(401).json({message : "Vous n'avez pas l'autorisation."});
                          }
                    })
                }
            }
        }
    });
};

exports.getOnePost = (req, res, next) => {
    const sql = `SELECT * from posts WHERE post_id = ?`;
    dbcon.query(sql, [req.params.id], function (err, result) {
        if (err) res.status(400).json(err);
        if (!result[0]) {
            res.status(404).json({ error: 'Le post auquel vous essayez d\'accéder n\'existe plus.' })
        } else {
            res.status(200).json(result)
        }
    });
};
  