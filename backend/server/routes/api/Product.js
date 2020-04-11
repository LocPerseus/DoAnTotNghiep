const express = require('express')
const productController = require('../../controllers/ProductController')
const authController = require('../../controllers/AuthController')
const router = express.Router()

router.route('/').get(productController.getAllProduct)

router.route('/cat/:id').get(productController.getProduct_Cat)

router
    .route('/:id')
    .get(productController.getProduct)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'store'),
        productController.createProduct
    )
    .patch(
        authController.protect,
        authController.restrictTo('admin', 'store'),
        productController.updateProduct
    )
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'store'),
        productController.deleteProduct
    )

module.exports = router