var Config = require('./default');

class Production extends Config{

    constructor(){

        super();
        this.debug = false;
        //生产环境数据库
        //this.database = { };
    }
}

module.exports = Production;