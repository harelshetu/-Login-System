const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{

    if(typeof req.user !== 'undefined' ){
        console.log(req.user.name);
    }

    res.render('home.ejs',{user:req.user});
});

module.exports = router;