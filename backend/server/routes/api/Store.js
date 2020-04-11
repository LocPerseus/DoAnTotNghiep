const express = require('express')
const router = express.Router()

const storeController = require('../../controllers/StoreController')
const authController = require('../../controllers/AuthController')

router.route('/comments').get(storeController.getAllComments)

router.route('/comments/:id').post(authController.protect, storeController.addComment)

router
    .route('/')
    .get(storeController.getAllStores)
    .post(authController.protect, authController.restrictTo('user'), storeController.createStore)

router
    .route('/:id')
    .get(storeController.getStore)
    .patch(authController.protect, authController.restrictTo('store'), storeController.updateStore)
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'store'),
        storeController.deleteStore
    )

module.exports = router