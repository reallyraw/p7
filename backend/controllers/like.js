const dbcon = require('../config/db');

exports.likeUnlikePost = (req, res) => {
  const postId = req.params.postId;
  const userId = req.auth.userId;
  const sql = `SELECT * FROM likes WHERE like_user_id = ${userId} AND like_post_id = ${postId}`;
  dbcon.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }

    if (result.length === 0) {
      const sql2 = `INSERT INTO likes (like_user_id, like_post_id) VALUES (${userId}, ${postId})`;
      dbcon.query(sql2, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json({ message: `Post liké !` });
      });
    } else {
      const sql3 = `DELETE FROM likes WHERE like_user_id = ${userId} AND like_post_id = ${postId}`;
      dbcon.query(sql3, (err, result) => {
        if (err) {
          res.status(404).json(err);
          throw err;
        }
        res.status(200).json({ message: `Like retiré !` });
      });
    }
  });
};

exports.showPostsLiked = (req, res) => {
  const userId = req.auth.userId;

  const sql = `SELECT like_post_id FROM likes WHERE like_user_id = ${userId}`;
  dbcon.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    
    let likesArray = [];
    for (let i = 0; i < result.length; i++) {
      likesArray.push(result[i].like_post_id)
    }
    res.status(200).json(likesArray);
  });
};