module.exports.auth = {

	init(app) {
        app.use(function(req, res, next) {
		    if( req.session && req.session.loginUser ){
		        res.locals.loginUser = req.session.loginUser;
		    }
		    next();
        });
	}
}