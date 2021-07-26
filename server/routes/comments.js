const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');


router.get('/', async (req,res)=>{
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        console.log(err)
    }
})


router.post('/', async (req,res)=>{
    try{
        const comment = new Comment(req.body).save();
        res.json(comment);
    } catch(err) {
        console.log(err)
    }
});

module.exports = router;


