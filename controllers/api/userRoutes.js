const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//GET /api/users
router.get('/', async(req, res) => {
//access user model and use find all users
try{
    const userData = await User.findAll({
      attributes:{ exclude: ['password'] }
      });
      res.status(200).json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
});

//GET /api/users by id
router.get('/:id', async(req, res) => {
    //access user model and use find one user by id
        try{
        const userData = await User.findOne({
          attributes:{ exclude: ['password'] },
          where: {
            id: req.params.id
          },
          include:[
            {
            model: Post,
            attributes: [
                    'id','title', 'content', 'created_at']
            },
            {
            model: Comment,
            attributes:[
                'id','comment_text', 'created_at'],
            include: {
                model: Post,
                attributes:['title']
            }
            },
            {
                model: Post,
                attributes:['title'] 
            }
        ]
});

    if (!userData) {
        res.status(404).json({message:`No user found with this id ${req.params.id}`});
        return;
    }
    res.status(200).json(userData);
} catch (err) {
  console.log(err);
  res.status(400).json(err);
}
});

//POST /api/user
router.post('/', (req, res) => {
    //access user model and use find one user by id
         User.Create({
            username: req.body.username,
            password: req.body.password 
         })
         .then(userData => {
            req.session.save(()=> {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
  
            res.json(userData);
            });
        });
    });

//login
router.post('/login',(req, res) => {
    //access user model and use find one user by username
      User.findOne({
          where: { username: req.body.username}      
    })
    .then(userData => {
    
    if (!userData) {
        res.status(400).json({message:`Not a valid username, ${req.body.username}`});
        return;
    }
    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
        res.status(400).json({message: "Not a Valid Password!"});
        return;
    }

    req.session.save(()=>{
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;

        res.json({user: userData, message: "Logged In Successfully!"});
        });
    });
 });

router.post('/logout',  async (req, res) => {
    try{
    if (req.session.logged_in) {
        const userData = await req.session.destroy(()=> {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    } 
    } catch {
        res.status(400).end();
    }
});


module.exports =router;
