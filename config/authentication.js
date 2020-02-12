module.exports = {

    checkAuthenticated: (req,res,next)=>{

        if(req.isAuthenticated()){
            next();
        }
        req.flash('err', 'Please log in order to continue');
        res.redirect('/users/login');
    },
    checkNotAuthenticated: (req,res,next)=>{

        if(req.isAuthenticated()){
            res.redirect('/');
        }
        next();
    }


}