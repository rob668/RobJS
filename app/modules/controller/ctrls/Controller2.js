module.exports = {

    one ( req, res ,next){
        //这是从Controller1中跳过来的
        console.log('controller2 one')
        next()
    },

    two ( req, res ,next){
        console.log('controller2 two')
        res.render("multiCtrlAction")
    },

    onegotwo( req, res){
        res.send('one go two')
    }
}