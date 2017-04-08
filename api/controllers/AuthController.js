/*
* @Author: d4r
* @Date:   2017-03-12 19:06:51
* @Last Modified by:   d4r
* @Last Modified time: 2017-03-12 19:48:32
*/

'use strict';

module.exports = {
	login : (req, res) => {
		console.log(':: login auth controller ')
		let email = req.body.user
		let password = req.body.password
		if(!email || !password) {
			return res.json(401, {err: 'email and password required'})
		}
		User.findOne({email: email}, (err, user) => {
			if (!user) {
				return res.json(401, {err: 'invalid email or password'});
			}
			User.comparePassword(password, user, (err, valid) => {
				if (err) {
		          return res.json(403, {err: 'forbidden'});
		        }
		        if (!valid) {
                  return res.json(401, {err: 'invalid email or password'});
                } else {
                	console.log(':: valide response login ')
                	let token = JwtService.issue({
                		id: user.id
                	})
                	return res.json({
                		user: user,
                		token: token
                	})
                }
			})
		})
	},
	logout: () => {
		console.log(":: logout auth controller ")
	}
}