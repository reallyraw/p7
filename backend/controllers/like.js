const dbcon = require('../config/db');

exports.likeUnlikePost = (req, res) => {
  const postId = req.params.postId;
  const userId = req.auth.userId;
  const sql = `SELECT * FROM likes WHERE like_user_id = ${userId} AND like_post_id = ${postId}`;
  dbcon.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({ err });
      throw err;
    }

    if (result.length === 0) {
      const sql2 = `INSERT INTO likes (like_user_id, like_post_id) VALUES (${userId}, ${postId})`;
      dbcon.query(sql2, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json({ message: `Post liké !` });
      });
    } else {
      const sql3 = `DELETE FROM likes WHERE like_user_id = ${userId} AND like_post_id = ${postId}`;
      dbcon.query(sql3, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json(err);
          throw err;
        }
        res.status(200).json({ message: `Like retiré !` });
      });
    }
  });
};

exports.showLikesNumber = (req, res) => {
  const { postId } = req.body;
  const sql = `SELECT COUNT(*) AS total FROM likes WHERE like_post_id = ${postId}`;
  dbcon.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.showPostLiked = (req, res) => {
  const postId = req.body.postId;
  const userId = req.auth.userId;

  const sql = `SELECT * FROM likes WHERE like_user_id = ${userId} AND like_post_id = ${postId}`;
  dbcon.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    
    if (result.length === 0) {
        res.status(200).json(false);
    } else {
      res.status(200).json(true);
    }
  });
};