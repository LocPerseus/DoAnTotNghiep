const router = require('express').Router();

router.use('/v1', require('./api/index'));

module.exports = router;