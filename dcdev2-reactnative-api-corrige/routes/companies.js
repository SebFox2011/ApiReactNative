var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {
  const { db } = req.app.locals;
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  let query = {};
  if (req.query.search) {
    query.name = new RegExp(req.query.search, 'i');
  }

  db.collection('companies').find(query).count((err, count) => {
    db.collection('companies')
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray((err, companies) => res.json({ count: count, limit: limit, companies: companies }));
  });
});

router.post('/', (req, res) => {
  const { db } = req.app.locals;
  db.collection('companies').insertOne(req.body, (err, company) => res.json(company));
});

router.put('/:id', (req, res) => {
  const { db } = req.app.locals;
  const { id } = req.params;
  db.collection('companies').updateOne({ _id: new ObjectID(id) }, { $set: req.body }, (err, company) => res.json(company));
});

router.delete('/:id', (req, res) => {
  const { db } = req.app.locals;
  const { id } = req.params;
  db.collection('companies').deleteOne({ _id: new ObjectID(id) }, (err, response) => res.json(response));
});

module.exports = router;
