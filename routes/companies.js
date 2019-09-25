var express = require('express');
var router = express.Router();

/* GET /companies */
router.get('/', function(req, res, next) {
    const {db} = req.app.locals;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page -1) * limit;
    db.collection('compagnies').find().skip(skip).limit(limit).toArray(
        (err,companies) => res.json(companies));
});

module.exports = router;
