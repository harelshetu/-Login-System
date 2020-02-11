const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{

    res.render('home.ejs');
   // next();

});

router.get('/login',(req,res,next)=>{

    res.render('login');
    //next();

});

router.get('/register',(req,res,next)=>{

    res.render('register', {
        errorName:'',
        errorEmail:'',
        errorPassword:'',
        errorPassword2:''
    });
    //next();

});
router.post('/register',(req,res)=>{

    const {name, email, password, password2} = req.body;
    console.log("-----------------",name);
    //server validation
    let errors = { name:"",
    email:"",
    password:"",
    password2:""
        }

    // check if name or email in database

    if(password.length < 5)
    {
        errors.password = "* password should be at least 5 charecters"
    }

    if(password != password2 && errors.password == "")
    {
        errors.password2 = "* password don't match"
    }

    
    res.render('register', {
        name:name,
        email:email,
        password:password,
        password2:password2,
        errorName:errors.name,
        errorEmail:errors.email,
        errorPassword:errors.password,
        errorPassword2:errors.password2
    });
   

});

module.exports = router;