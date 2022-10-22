const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// route to all post dashboard
router.get('/', withAuth, (req, res) => {
  Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes:['id', 'title', 'content', 'created_at'],
        include:[
            {
            model: Comment,
            attributes:[
                'id','comment_text', 'post_id', 'user_id', 'created_at'
            ],
            include:{
              model: User,
              attributes:['username']
              }
            },
            { 
              model: User,
              attributes:['username']
            }
        ]
    })
    .then((dbPostData)=> {
    // Serialize data so the template can read it
    const posts = dbPostData.map((post)=> post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      posts,
      logged_in: true,
      username: req.session.username
    });
    })
    .catch ((err)=> {
        console.log(err);
        res.status(500).json(err);
      });
    });    
        
//route to get a edit a single post
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
      where:{
          id: req.params.id
      },
      attributes:['id', 'title', 'content', 'created_at'],
      include: [
          {
          model: User,
          attributes:['username']
          },
          {
              model: Comment,
              attributes:[
                'id','comment_text', 'post_id', 'user_id', 'created_at'
              ],
              include:{
                  model: User,
                  attributes:['username']
              }
          }
        
        ]
    })
    .then((dbPostData)=> {
     if (!dbPostData){
      res.status(404).json({message: 'No post found with this id'});
      return;
     }
     //serialize the data
     const post = dbPostData.get({plain:true});
     //pass data to template
      res.render('edit-post', { 
        post, 
        logged_in: true,
        username: req.session.username,
      });
    })
    .catch ((err)=> {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.get('/new', (req, res) => {
    res.render('new-post', { username: req.session.username } );
  });
  

module.exports = router;