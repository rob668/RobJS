const servs = require("../servs")

module.exports = {

    login (req, res) {
        if(req.session.loginUser){
            res.redirect('my.html')
        }
        else {
            res.render('login')
        }
    },

    loginsrv( req, res ){
        let email = req.body.email;
        let pwd = req.body.pwd;
        if( !email || !pwd ){
            return  res.json({"status":0})
        }
        //调用服务
        let result = servs.login(email, pwd);
        if( result == 1){
            req.session.regenerate(function(err) {
                if(err){
                    res.json({"status":0})
                }

                req.session.loginUser = email;
                res.json({"status":1})
            });
        }else{
            res.json({"status":0})
        }
    },

    UserCenter (req, res){
        res.render('my')
    },

    Logout (req, res){
        req.session.destroy(function(err) {
            if(err){
                return res.send(err);
            }
            res.clearCookie("connect.sid");
            res.render('logout');
        });
    },



    CreateBlog (req, res){
        res.send("CreateBlog")
    }
}