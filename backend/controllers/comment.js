const dbcon = require('../config/db');


exports.postComment = (req, res, next) => {
    const comment = {
        comment_id_post: req.params.id,
        comment_author: req.auth.userId,
        comment_date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" }),
        comment_text: req.body.comment,
    };
    var sql = "INSERT INTO comments (comment_id_post, comment_author, comment_date, comment_text) VALUES (?,?,?,?)";
    dbcon.query(sql, [comment.comment_id_post, comment.comment_author, comment.comment_date, comment.comment_text], function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: `Commentaire ajouté !` });
    })
}

exports.getComments = (req, res, next) => {
    var sql = `SELECT comment_id, comment_date, comment_text, user_name, user_firstname, user_pp, comment_author
            FROM comments 
            INNER JOIN users 
            ON comments.comment_author = users.user_id
            WHERE comment_id_post = ?`;
    dbcon.query(sql, [req.params.id], function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
};

exports.deleteComment = (req, res, next) => {
    var sql = `SELECT * FROM comments WHERE comment_id = ?`;
    dbcon.query(sql, [req.params.id], function (err, result) {
        if (err) res.status(400).json({ err });
        if (!result[0]) res.status(400).json({ message: "Aucun commentaire correspondant" });
        else {
            if (result[0].comment_author == req.auth.userId) {
                var sql2 = `DELETE FROM comments WHERE comment_id = ?`;
                dbcon.query(sql2, [req.params.id], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: `Commentaire supprimé` });
                });
            } else {
                res.status(401).json({message : "Vous n'avez pas l'autorisation."});
            }
        }
    });
};