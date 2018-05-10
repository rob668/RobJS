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

        //指定控制器目录
        this.controllerPathName = "ctrls";
    }
}

module.exports = Config;