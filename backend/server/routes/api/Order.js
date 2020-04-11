const express = require('express')
const router = express.Router()

const orderController = require('../../controllers/OrderController')
const authController = require('../../controllers/AuthController')

router
    .route('/')
    .get(orderController.getAllCategories)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'store'),
        categoryController.createCategory
    )

router
    .route('/:id')
    .get(categoryController.getCategory)
    .patch(authController.protect, categoryController.updateCategory)
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'store'),
        categoryController.deleteCategory
    )

module.exports = router