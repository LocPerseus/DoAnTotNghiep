const express = require('express');
const categoryController = require('../../controllers/CategoryController');
const authController = require('../../controllers/AuthController');
const router = express.Router();

router
    .route('/')
    .get(authController.protect, authController.restrictTo('admin', 'store'), categoryController.getAllCategories)
    .post(authController.protect, categoryController.createCategory);

router
    .route('/:id')
    .get(categoryController.getCategory)
    .patch(authController.protect, categoryController.updateCategory)
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'store'),
        categoryController.deleteCategory
    );

module.exports = router;