var express = require('express');
var router = express.Router();
ObjectID = require('mongodb').ObjectID;


/* GET /companies */
router.get('/', function(req, res, next) {
    const {db} = req.app.locals;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page-1) * limit;

    let query = {};

    if (req.query.search){ // teste si la recherche contient des mots, sans case sensitive
        query.name = new RegExp(req.query.search,'i');
    }
// MOdificaiton pour retourner le nombre de résultats avec les résultats
    db.collection('compagnies').count((err,count) =>{
        db.collection('compagnies')
            .find(query)
            .skip(skip)
            .limit(limit)
            .toArray(
            (err,companies) => res.json({count:count,limit:limit,companies:companies}));
    });

});

router.post('/',(req,res) =>{
    const {db} = req.app.locals;
    db.collection('compagnies').insertOne(req.body,(err,company) => res.json(company));
});

// Route pour modifier une entrée
router.put('/:id',(req,res)=>{
    const {db} = req.app.locals;
    const {id} = req.params;
    db.collection('compagnies').updateOne({ _id: new ObjectID(id) },{$set:req.body},
        (err, response) => res.json(response));
});

// Route pour supprimer une entrée
router.delete('/:id',(req,res)=>{
    const {db} = req.app.locals;
    const {id} = req.params;
    db.collection('compagnies').deleteOne({ _id: new ObjectID(id) },
        (err, response) => res.json(response));
});

module.exports = router;
