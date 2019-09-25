var express = require('express');
var router = express.Router();

/* GET /companies */
router.get('/', function(req, res, next) {
    const {db} = req.app.locals;
    db.collection('compagnies').find().skip(0).limit(10).toArray(
        (err,companies) => res.json(companies));

    res.render('index', { title: 'Express' });
});

module.exports = router;
