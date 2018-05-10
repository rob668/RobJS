exports.routers = [
    { prefix:"/login.html",  ctrl:"UserController", method:['GET', 'POST'], action:"login" },
    { prefix:"/my.html",  ctrl:"UserController", action:"UserCenter", filter: "login_required" },
    { prefix:"/createblog.html",  ctrl:"UserController", action:"CreateBlog", filter: "test_middle"},
    { prefix:"/logout.html",  ctrl:"UserController", action:"Logout" },

    { prefix:"/loginsrv", ctrl:"UserController", method:['POST'], action:"loginsrv"}
]

exports.filters = {
    "login_required": {
        prefix: "mount",
        handler:  function(req, res, next){
            if(req.session.loginUser == undefined ){
                res.redirect('/user/login.html')
            }else next();
        }
    }
}