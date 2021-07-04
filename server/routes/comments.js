const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

//GETS ALL COMMENTS
router.get('/', async (req,res)=>{
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        console.log(err)
    }
})

//POST NEW COMMENT
router.post('/', async (req,res)=>{
    try{
        const comment = new Comment(req.body).save();
        res.json(comment);
    } catch(err) {
        console.log(err)
    }
});

module.exports = router;

// //GET SPECIFIC COMMENT
// router.get('/:commentId', async (req, res)=> {
//     try {
//         const comment = await Comment.findById(req.params.commentId);
//         res.json(comment)
//     } catch (err) {
//         console.log(err)
//     }
// })

// //DELETE SOME COMMENT BY ID
// router.delete('/:commentId', async (req,res) => {
//     try {
//         const removedComment = await Comment.remove({_id: req.params.commentId});
//         res.json(removedComment);
//     } catch (err) {
//          console.log(err)
//     }
// })

// //Update comment title
// router.patch('/:commentId', async (req,res) => {
//     try {
//         const updatedComment = await Comment.updateOne(
//             { _id: req.params.commentId },
//             { $set: req.body } }
//         );
//         res.json(updatedComment)
//     } catch (err) {
//          console.log(err)
//     }
// });
// module.exports = router;
