const express = require('express');
const productController = require('../../controllers/ProductController');
const router = express.Router();

router
    .route('/')
    .get()
    .post();

router
    .route('/:id')
    .get()
    .patch()
    .delete();

module.exports = router;