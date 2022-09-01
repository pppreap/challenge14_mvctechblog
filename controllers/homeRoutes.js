const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection')

//route to get homepage, all posts
router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes:[
        'id' , 'title', 'created_at', 'post_content'
    ],
    include:[
        {
        model: Comment,
        attributes:['id','comment_text', 'post_id', 'user_id', 'created_at'],
        include:{
            model: User,
            attributes:['username']
        }
        },
        {
            model:User,
            attributes:['username']
        }
    ]
    })
    .then(dbPostData=> {
    // Serialize data so the template can read it
    const posts = dbPostData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in
    });
})
  .catch (err=> {
    console.log(err);
    res.status(500).json(err);
  });
});

//route to login
router.get('/login', (req,res)=> {
   if(req.session.logged_in) {
    res.redirect('/');
    return;
   }
   res.render('login');
});

//route to sign up
router.get('/signup', (req,res)=> {
    if(req.session.logged_in) {
     res.redirect('/');
     return;
    }
    res.render('signup');
 });
 

//route to get a single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where:{
        req.params.id
    },
    attributes:['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
    include: [
        {
            model: Comment,
            attributes:['id','comment_text', 'post_id', 'user_id', 'created_at'],
            include:{
                model: User,
                attributes:['username']
            }
        },
        {
            model:User,
            attributes:['username']
        }
      ]
  })
  .then(dbPostData=> {
   if (!dbPostData){
    res.status(404).json({message: 'No post found with this id'});
    return;
   }
   //serialize the data
   const post = dbPostData.get({plain:true});
   //pass data to template
    res.render('single-post', { 
      post, 
      logged_in: req.session.logged_in
    });
})
  .catch (err=> {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;