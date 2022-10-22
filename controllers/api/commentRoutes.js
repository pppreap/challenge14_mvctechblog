const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//GET  all comments
router.get('/', (req, res) => {
 Comment.findAll({})
     .then(dbCommentData => res.json(dbCommentData))
     .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
});



router.post('/', withAuth, (req, res) => {
    if (req.session){
      Comment.create({
            ...req.body, 
            user_id: req.session.user_id
          })
          .then(dbCommentData => res.json(dbCommentData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      }
    });


//DELETE comment
router.delete('/:id', withAuth, (req, res) =>{
    Comment.destroy ({
               where: { id: req.params.id }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
        
    

module.exports =router;