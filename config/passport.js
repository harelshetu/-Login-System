const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = (passport)=>{

    passport.use(new LocalStrategy({usernameField: 'email'},
        function(email, password, done) {
          User.findOne({ email: email }, function (err, user) {
            if (err) {
                 return done(err); }
            if (!user) { 
                return done(null, false,{message:"This email isn't registered"}); }

                bcrypt.compare(password, user.password, function(err, match) {

                    if(err) throw err;

                    if(match){
                        return done(null,user)
                    }
                    else{
                        return done(null, false, {message:"Wrong password"});
                    }
          });
        }).catch(err=>console.log(err))
    }));


    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, function (err, user) {
          done(err, user);
        });
      });
};