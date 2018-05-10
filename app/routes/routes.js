exports.routers = [
    //如果不指定module: 'base' 则会查找app目录下的ctrls控制器
    { prefix: ["/", "/index.html"], ctrl: "MainController", action: "index" },
    { prefix: "/sendcode", method: ["POST"], ctrl: "MainController", action: "send_code" },
    { prefix: "/test/:action/:id.html", ctrl: "MainController", action: "test"},
    { prefix: "/about", view: "about"},
    { prefix:"/filter",  ctrl:"MainController", action:"filter", filter: "testfilter"}
];

let mainCtrl = APP.ctrls.get("MainController");
exports.filters = {
    //定义一个名为 allfilter过滤器
    "allfilter":{
        //指定 prefix  为*将会应用于所有路由，包括模块路由
        //为 * 的路由不需要在 routers 中指定 filter 属性
        //prefix : "*",
        handler: function(req, res, next){
            console.log('这是全局路由，所有模块下也会生效', Date.now());
            next();
        }
    },

    "testfilter":{
        prefix : "mount",
        handler: [function(req, res, next){
            // 如果 id 为 0, 跳到下一个路由
            if( !req.query.id ){
                res.send('id不能为空');
            }else if( req.query.id == 0  ) {
                res.send('id不能为0');
            }
            //否则将控制权交给栈中下一个中间件
            else next();
        }, mainCtrl.hello]
    }
}