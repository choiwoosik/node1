const express = require('express');
const Config = require('../models/config.js');
const passport = require('../routes/auth.js');
const router = express.Router();

// Login Page
router.get('/', (req, res) => {
    //const KAKAO_KEY = process.env.KAKAO_KEY; 
    res.render('login', {ClientId: process.env.KAKAO_CLIENT_ID});
});

// Main Page
router.get('/main', (req, res) => {
   res.render('main', {SessionId: req.session.passport.user});
    
});

// Kakao Login Info Page
//router.get("/kakao", passport.authenticate("kakao-login"));

// KaKao Login Page
router.get('/api/auth/kakao/callback', passport.authenticate("kakao-login", {
   failureRedirect: '/api/auth/fail'}), (req, res) => {
   res.redirect('/main');   
});

router.get('/api/auth/fail', (req, res) => {
    console.log(req);
});


// Search All Products 
router.get('/config', (req, res) => {
    Config.find((err, configs) => {
        if(err) return res.status(500).send({error:'Database Failure'});
        //res.render('main', config);
        res.json(configs);
})});

// Insert Products Info. 
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
