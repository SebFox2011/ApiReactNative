var express = require('express');
var router = express.Router();

/* GET /companies */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' });
});

module.exports = router;
