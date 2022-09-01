const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes.js');
const commentRoutes = require('./commentRoutes.js');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

router.use((req,res)=>{
    res.status(404).end();
});

module.exports = router;





