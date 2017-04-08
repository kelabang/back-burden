/*
* @Author: d4r
* @Date:   2017-03-12 01:12:46
* @Last Modified by:   d4r
* @Last Modified time: 2017-03-12 19:43:34
*/

'use strict';

const jwt = require('jsonwebtoken')
const secret = 'el psy congro'

module.exports = {

	issue: (payload) => {
		console.log('issue jwtservice', payload)
		return jwt.sign(
			payload,
			secret,
			{
				expiresIn: 60*60*1 // token expire time
			}
		)
	},

	verify: (token, cb) => {
		return jwt.verify(
			token, // token to verify
			secret, // secret
			{}, // option
			cb // next
		)
	}

}
