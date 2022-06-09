const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middlewares/auth");

router.post("/:id", auth, commentCtrl.postComment);
router.get("/:id", auth, commentCtrl.getComments);
router.delete("/:postId/:id", auth, commentCtrl.deleteComment);

module.exports = router;