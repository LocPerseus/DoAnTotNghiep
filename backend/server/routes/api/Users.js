const express = require('express');
const authController = require('../../controllers/AuthController');
const userController = require('../../controllers/UserController');
const router = express.Router();

// AUTH
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updatePassword', authController.protect, authController.updatePassword);
router
    .route('/')
    .get(userController.getAllUsers)
    // .post(userController);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);
router
    .route('/:id')
    // .get(userController)
    .patch(userController.updateMe)
    // .delete(userController);

module.exports = router;