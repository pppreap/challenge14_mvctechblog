const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//GET  all comments
router.get('/', async (req, res) => {
try {
    const commentData = await Comment.findAll({});
    if (commentData.length===0){
        res
           .status(404)
           .json({message: 'no message found'});
       return;    
    }
    res.status(200).json(commentData);
} catch (err) {
    res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: { id: req.params.id },
        });
        if (commentData.length === 0){
            res
               .status(404)
               .json({message: `There is no comment with id =${req.params.id}`});
           return;    
        }
        res.status(200).json(commentData);
    }catch (err) {
        res.status(500).json(err);
    }
    });

router.post('/', withAuth, async (req, res) => {
        try {
          const newComment = await Comment.create({
            ...req.body, 
            user_id: req.session.user_id,
          });
      
          res.status(200).json(newComment);
        } catch (err) {
          res.status(400).json(err);
        }
      });
      

//PUT   create comment
router.put('/:id', withAuth, async (req, res) =>{
    try {
        const updateComment = await Comment.update (
        {
          comment_text: req.body.comment_text   
         },
        {
           where: { 
            id: req.params.id 
            }
       }
     );
    if (!updateComment) {
        res
        .status(404)
        .json({message: `There is no comment with id =${req.params.id}`});
    return;    
 }
 res.status(200).json(updateComment);
} catch (err) {
 res.status(400).json(err);
}
});


//DELETE comment

router.delete('/:id', withAuth, async (req, res) =>{
        try {
            const commentData = await Comment.destroy (
            {
               where: { 
                id: req.params.id 
                }
           }
         );
        if (!commentData) {
            res
            .status(404)
            .json({message: `No message by user id =${req.session.user_id} found with message id=${req.params.id}.`});
        return;    
     }
     res.status(200).json(commentData);
    } catch (err) {
     res.status(400).json(err);
    }
    });

module.exports =router;