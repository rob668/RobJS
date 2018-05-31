var em = require('express-moduledev');
var logger = require('morgan');

var config = {
    //指定端口，默认端口 8000
    "port":801,
    //使用环境 'default','development','production','testing'
    "use_env": "development",
    //顶级路由存放目录名称 默认routes
    //"router":"routes/"
}

//启动服务
em.Run(config)
em.log.p('server runing..')
