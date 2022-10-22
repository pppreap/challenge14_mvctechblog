const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


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
router.post('/', async(req, res) => {
    //access user model and use find one user by id
        try {
            const userData = await User.Create(req.body);
      console.table(req.body);
        req.session.save(()=> {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
  
            res
                .status(201)
                .json({message:`${userData.username} Username is Created!`});

          }); 
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
        });

//login
router.post('/login', async(req, res) => {
    //access user model and use find one user by username
       try {
        const userData = await User.findOne({
          where: { username: req.body.username}      
    });
    
    if (!userData) {
        res.status(400).json({message:`Not a valid username, ${req.body.username}`});
        return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
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
 } catch (err){
    res.status(400).json(err);
 }
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
