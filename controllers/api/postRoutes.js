const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//GET  all posts
router.get('/', (req, res) => {
    // console.log("=========");
    Post.findAll({
        attributes:[ 'id', 'title', 'content','created_at'],
        order:[['created_at', 'DESC']],
        include:[
                 {
                model: User,
                attributes:['username']
                },
                {
                model: Comment,
                attributes:['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include:{
                    model: User,
                    attributes:['username']
                    }
                }
                ]
                })
                .then (dbPostData => res.json(dbPostData))
                .catch (err => {
                    console.log(err);
                    res.status(500).json(err);
                });
});
 

router.get('/:id', (req, res) => {
    //access post model and use find one post by id
       Post.findOne({
          where: {
            id: req.params.id
          },
            attributes: [ 'id','title', 'content','created_at'],
            order:[['created_at', 'DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Comment,
                        attributes:[ 'id','comment_text', 'post_id', 'user_id','created_at'],
                         include: {
                            model: User,
                            attributes:['username']   
                             }
                    }
                ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({message:`No post found with this id = ${req.params.id}!`});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });


//POST 
router.post('/', withAuth, (req, res) =>{
    Post.create({
            ...req.body,
            user_id: req.session.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

//UPDATE
router.put('/:id', withAuth,  (req, res) =>{
    Post.update({
            title: req.body.title,
            content: req.body.content     
            },
            {
             where: {
                id: req.params.id
                 }
            })
             .then (dbPostData => {
             if (!dbPostData) {
                res.status(404).json({ message : 'No post with id!'});
                return;
                }
                res.json(dbPostData);
            })
           .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });
    });

//DELETE

router.delete('/:id', withAuth, (req, res) =>{
    Post.destroy({
         where: {
            id: req.params.id,
            // user_id: req.session.user_id
             }
        })
        .then(dbPostData => {
            if (!dbPostData) {
            res.status(404).json({ message : `No post  by user_id =${req.session.user_id} with id!= ${req.params.id}`});
            return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports =router;
