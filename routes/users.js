const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { checkAuthenticated,checkNotAuthenticated} = require('../config/authentication');
const router = express.Router();

/**
 * this middleware will check if there is method overide 
 * for DELETE request
 */
router.use( function( req, res, next ) {
  if ( req.query._method == 'DELETE' ) {
      // change the original METHOD to DELETE
      req.method = 'DELETE';
      //set the match url 
      req.url = req.path;
  }       
  next(); 
});

router.get("/login", checkNotAuthenticated ,(req, res, next) => {
  res.render("login");
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }),(req, res, next) => {});

router.get("/register", checkNotAuthenticated,(req, res, next) => {
  res.render("register");
  
});
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  //server validation errors
  let errors = {};

  if (password.length < 5) {
    errors.password = "* password should be at least 5 charecters";
  }
  //console.log(errors.password);

  if (password != password2 && errors.password == undefined) {
    errors.password2 = "* password don't match";
   // console.log(errors);
  }
  if (Object.keys(errors).length > 0) {
    res.render("register", {
      name: name,
      email: email,
      password: password,
      password2: password2,
      errorPassword: errors.password,
      errorPassword2: errors.password2
    });
  } else {
    User.findOne({ email: email })
      .then(result => {
        if (result) {
          errors.email = "Email already exists";
          res.render("register", {
            name: name,
            email: email,
            password: password,
            password2: password2,
            errorName: errors.name,
            errorEmail: errors.email,
            errorPassword: errors.password,
            errorPassword2: errors.password2
          });
        } else {
          const user = new User({
            name,
            email,
            password
          });
          //console.log("before-----------------", user);

          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) {
                throw err;
              }
              user.password = hash;
              //console.log("after-----------------", user);
              user
                .save()
                .then(() => {
                  req.flash("success", "You are now registered, please log in");
                  res.redirect("/users/login");
                })
                .catch(err => {
                  //console.log("failed to save in db ", err);
                  req.flash("danger", "Registration failed");
                });
            });
          });
        }
      })
      .catch(err => console.log("failed to find in db ", err));
  }
});

router.delete("/logout", (req, res) => {
  req.logOut();
  req.flash('success','You logged out');
  res.redirect('/');
});

module.exports = router;
