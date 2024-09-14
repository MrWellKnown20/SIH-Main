module.exports.isLogin = (req, res, next)=>{
    console.log(req.user);
    if(!req.isAuthenticated())
    {
        req.flash("error","logged in to access this page");
        return res.redirect("/login");
    }
    next();
}