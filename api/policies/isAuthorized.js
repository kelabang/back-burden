/*
* @Author: d4r
* @Date:   2017-03-13 14:23:33
* @Last Modified by:   d4r
* @Last Modified time: 2017-03-13 14:29:46
*/

'use strict';

module.exports = (req, res, next) => {
	let token;
	  if (req.headers && req.headers.authorization) {
	    let parts = req.headers.authorization.split(' ');
	    if (parts.length == 2) {
	      let scheme = parts[0],
	        credentials = parts[1];
	      if (/^Bearer$/i.test(scheme)) {
	        token = credentials;
	      }
	    } else {
	      return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
	    }
	  } else if (req.param('token')) {
	    token = req.param('token');
	    // We delete the token from param to not mess with blueprints
	    delete req.query.token;
	  } else {
	    return res.json(401, {err: 'No Authorization header was found'});
	  }
	  JwtService.verify(token, function (err, token) {
	    if (err) return res.json(401, {err: 'Invalid Token!'});
	    req.token = token; // This is the decrypted token or the payload you provided
	    next();
	  });
}