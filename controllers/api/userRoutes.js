const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

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
                    'id','title', 'created_at', 'post_text'
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
router.post('/', (req, res) => {
    //access user model and use find one user by id
        User.Create({
            username: req.body.username,
            // email: req.body.email,
            password: req.body.password       
})
.then(dbUserData=> {
    req.session.save(()=>{
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
    res.json(dbUserData);
})
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);

});
});

//login
router.post('/login', (req, res) => {
    //access user model and use find one user by email
        User.findOne({
          where: {
            // email:req.body.email
            username:req.body.username
          }      
})
.then(dbUserData=> {
    if (!dbUserData) {
        res.status(404).json({message:'No user found with this email address!'});
        return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
        res.status(400).json({message: "Not a Valid Password!"});
        return;
    }

    req.session.save(()=>{
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = dbUserData.loggedIn = true;

        res.json({user: dbUserData, message: "Logged In Successfully!"});
 });
 });
 });

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(()=>{
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// PUT user by id
router.put('/:id', withAuth, (req, res) =>{
    User.update(req.body, {
        individualHooks:true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData=> {
        if (!dbUserData[0]) {
            res.status(404).json({message:'No user found with this id!'});
            return;       
    }
    res.json(dbUserData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports =router;
