const express = require('express')
const router = express.Router()

const cartController = require('../../controllers/CartController')
const authController = require('../../controllers/AuthController')

router.get('/check', authController.protect)
router.post('/add/:pID', authController.protect, cartController.addProductToCart)
router.patch('/update/:action', authController.protect, cartController.updateCart)
router.get('/', authController.protect)

module.exports = router