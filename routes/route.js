const express = require('express');
const Config = require('../models/config.js');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('main'); // (3)
});

router.get('/about', (req, res) => {
    res.render('about'); // (4)
});

router.get('/config', (req, res) => {
    Config.find((err, configs) => {
        if(err) return res.status(500).send({error:'Database Failure'});
        //res.render('main', config);
        res.json(configs);
})});

router.post('/config', (req, res) => {
    var config = new Config();
    config.ProductID = req.body.ProductID;
    config.ProductName = req.body.ProductName;
    
    config.save(err => {
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});     
    })
});

module.exports = router;
