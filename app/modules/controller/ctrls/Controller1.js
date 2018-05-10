let checkNext = false;
module.exports = {

    index (req, res) {
        res.render("index")
    },

    one ( req, res ,next){
        //这里是第一方法入口，假如满足继续路由的条件则继续往下进行
        if( !req.query.p ){
            return res.send("未指定参数 p")
        }
        if( req.query.p !== "one"){
            return res.send("参数 p 不等one")
        }
        //将控制权交给下一个函数 two
        next()
    },

    two ( req, res ,next){
        //一切都很顺利，继续向下走
        checkNext = true;
        next()
    },

    three ( req, res ,next){
        if( !checkNext ){
            return res.send("不可以直接访问我")
        }
        res.render("multiAction")
    }
}