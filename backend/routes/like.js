const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like");
const auth = require("../middlewares/auth");

router.get("/:postId", auth, likeCtrl.showLikesNumber);
router.post("/", auth, likeCtrl.showPostsLiked);
router.post("/post/:postId", auth, likeCtrl.likeUnlikePost);


module.exports = router;