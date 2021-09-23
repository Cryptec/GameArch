
const checkAuthentication = function checkAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else
		res.status(401).send({ error: 'Invalid permission' });
}

module.exports = checkAuthentication