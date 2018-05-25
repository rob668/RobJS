var session = require('express-session');
var FileStore = require('session-file-store')(session)

class Config{

    constructor(){

        //是否开启调试模式
        this.debug = false;

        //数据库连接配置
        this.database = {
            "host": "127.0.0.1",
            "port": "3306",
            "database": "test",
            "username": "root",
            "password": "root",
            "dialect": "mysql"
        };

        //配置session_store
        this.session_store = {
            "secret": 'skdf093ks',
            "cookie": {  maxAge: 1000 * 60 * 60 * 24 * 1 },
            "resave": true,
            "saveUninitialized": false,
            "store":new FileStore
        }
    }
}

module.exports = Config;