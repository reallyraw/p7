const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.get("/", auth, postCtrl.getAllPosts);
router.post("/", auth, multer, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);

module.exports = router;