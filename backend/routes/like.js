const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like");
const auth = require("../middleware/auth");

router.post("/", likeCtrl.likePost);
router.post("/liked", likeCtrl.isLiked);


module.exports = router;