const router = require('express').Router()

const productRouter = require('./Product')
const categoryRouter = require('./Category')
const tagsRouter = require('./Tags')
const userRouter = require('./Users')
const storeRouter = require('./Store')
const cartRouter = require('./Cart')

router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/users', userRouter)
router.use('/stores', storeRouter)
router.use('/carts', cartRouter)
    // router.use('/api/v1/tags', tagsRouter);

module.exports = router