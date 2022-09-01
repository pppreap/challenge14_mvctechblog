const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//GET /api/users
router.get('/', (req, res) => {
//access user model and use find all users
    User.findAll({
      attributes:{ exclude: ['password'] }
      })
      .then(dbUserData=> res.json(dbUserData))
      .catch (err=> {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET /api/users by id
router.get('/:id', (req, res) => {
    //access user model and use find one user by id
        User.findOne({
          attributes:{ exclude: ['password'] },
          where: {
            id: req.params.id
          },
          include:[
            {
                model: Post,
                attributes: [
                    'id','title', 'created_at', 'post_content'
                ]
            },
            {
            model: Comment,
            attributes:[
                'id','comment_text', 'created_at'
            ],
            include:{
                model: Post,
                attributes:['title']   
            }
        }
        ]
})
.then(dbUserData=> {
    if (!dbUserData) {
        res.status(404).json({message:'No user found with this id!'});
        return;
    }
    res.json(dbUserData);
})
.catch (err=> {
    console.log(err);
    res.status(500).json(err);
});
});

//POST /api/user
