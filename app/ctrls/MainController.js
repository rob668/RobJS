module.exports = {

    index(req, res) {
        res.render('/index')
    },

    send_code(req, res) {
        res.json({"code":200,"msg":"success"})
    },

    test(req, res){
        console.log(req.params.action)
        console.log(req.params.id)
        res.json({"action":req.params.action, "id":req.params.id});
    },

    hello(req, res, next){
        console.log("HELLO!!")
        next();
    },

    filter (req, res){
        res.send("filter")
    }
}