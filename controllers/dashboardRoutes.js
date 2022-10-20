const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');


// route to all post dashboard
router.get('/', withAuth, (req, res) => {
  Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes:[
            'id','title', 'created_at', 'post_text'
        ],
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
            model:User,
            attributes:['username']
        }
        ]
    })
    .then(dbPostData=> {
    // Serialize data so the template can read it
    const posts = dbPostData.map(post => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      posts, logged_in: true
    });
    })
    .catch (err=> {
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
      attributes:[
        'id', 'comment_text', 'post_id', 'user_id', 'created_at'
      ],
      include: [
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
      res.render('edit-post', { 
        post, 
        logged_in: true
      });
    })
    .catch (err=> {
      console.log(err);
      res.status(500).json(err);
    });
  });

//  route to create a post   
router.get('/create/', withAuth,(req, res) => {
   Post.findAll({
    where: {
    user_id: req.session.user_id
    }, 
    attributes:  [
        'id','title', 'created_at', 'post_content'
    ],
    include: [
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
   const posts = dbPostData.map((post) => post.get({ plain: true }));
   //pass data to template
    res.render('create-post', { 
      post, 
      logged_in: true
    });
  })
  .catch (err=> {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;