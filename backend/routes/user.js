const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/profile', auth, multer, userCtrl.updateProfile);
router.get('/:id', multer, userCtrl.getOneUser);
router.post('/', userCtrl.checkUserAuth);

module.exports = router;