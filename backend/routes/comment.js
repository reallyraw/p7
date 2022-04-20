const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/", auth, commentCtrl.postComment);
router.get("/", auth, commentCtrl.getComments);
router.delete("/:commentId/:postId", auth, commentCtrl.deleteComment);

module.exports = router;