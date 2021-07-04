const express = require('express');
const router = express.Router();
const News = require('../models/News');

//GETS ALL news
router.get('/', async (req,res)=>{
    try {
        const news = await News.find();
        res.json(news);
    } catch (err) {
        console.log(err);
    }
})

//POST NEWs
router.post('/', async (req,res)=>{
    try{
        const news = new News(req.body).save();
        res.json(news);
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;

// //GET SPECIFIC NEWS
// router.get('/:newsId', async (req, res)=> {
//     try {
//         const news = await News.findById(req.params.newsId);
//         res.json(news)
//     } catch (err) {
//         console.log(err);
//     }
// })

// //DELETE SOME NEWS BY ID
router.delete('/:newsId', async (req,res) => {
    try {
        const removedNews = await News.remove({_id: req.params.newsId});
        res.json(removedNews);
    } catch (err) {
        console.log(err);
    }
})

// //Update news title
// router.patch('/:newsId', async (req,res) => {
//     try {
//         const updatedNews = await News.updateOne(
//             { _id: req.params.newsId },
//             { $set: { title: req.body.title } }
//         );
//         res.json(updatedNews)
//     } catch (err) {
//         console.log(err);
//     }
// });
