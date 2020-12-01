const express = require('express');
const router = express.Router();

const projectRouter = require('./projectRouter')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).send("Welcome to the api!")
});

router.use('/project', projectRouter)

module.exports = router;
