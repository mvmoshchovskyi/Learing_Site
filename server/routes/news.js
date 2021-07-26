const express = require('express');
const router = express.Router();
const News = require('../models/News');

router.get('/', async (req,res)=>{
    try {
        const news = await News.find();
        res.json(news);
    } catch (err) {
        console.log(err);
    }
})


router.post('/', async (req,res)=>{
    try{
        const news = new News(req.body).save();
        res.json(news);
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;


