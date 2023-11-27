const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jwt = require('../auth/auth.js');
const userController = require('../controllers/userController.js');

router.post('/signup', upload.none(), userController.createUser);
router.post('/signin', upload.none(), userController.signIn);
router.post('/signout', upload.none(), userController.signOut);
router.get('/', upload.none(), jwt.auth, userController.getUserInfo);
router.put('/edit', upload.none(), jwt.auth, userController.updateUser);
// router.delete('/delete/:id', upload.none(), jwt.auth, userController.deleteUser);

module.exports = router;
