//用户服务处理代码
const models = require("../models")

module.exports = {

    async login (email, pwd){

        //验证用户名和密码
        var m_user = models.UserModel;
        let u = await m_user.getone({where: {"email": email}})

        if( u == null ) return 0;

        //判断密码
        let p = u.pwd;
        /*
            if( p == pwd ){}
            something to code
        */
        return 1;
    }
}