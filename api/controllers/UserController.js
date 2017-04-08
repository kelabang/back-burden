/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	signup: (req, res) => {
		if (req.body.password !== req.body.confirmPassword) {
			return res.json(401, {err: 'Password doesn\'t match, What a shame!'})
		}
		User.signup(req.body, (err, record) => {
			// if(err) return res.badRequest(err)
			if (err) {
				return res.json(err.status, {err: err});
			}
			return res.created(record)
		})
	}
}

