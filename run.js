var em = require('express-moduledev');
//var RedisStore = require('connect-redis')(em.session);
var FileStore = require('session-file-store')(em.session);

var config = {
    //使用环境 'default','development','production','testing'
    "use_env": "development",
    //顶级路由存放目录名称 默认routes
    //"router":"routes/",
    "session_store": {
	    "secret": 'skdf093ks',
	    "cookie": {  maxAge: 1000 * 60 * 60 * 24 * 1 },
	    "resave": true,
	    "saveUninitialized": false,
	    "store": new FileStore
    }
}

em.Run(config)
em.log.p('server runing..')

