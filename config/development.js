var Config = require('./default');

class Development extends Config{

    constructor(){

        super();

        this.debug = true;


    }
}

module.exports = Development;