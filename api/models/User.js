/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt')

module.exports = {
  attributes: {
  	name: {
  		type: 'string'
  	},
  	username: {
  		type: 'string',
  		required: true,
  		unique: true,
  		username: true
  	},
  	email: {
  		type: 'string',
  		required: true,
  		unique: true
  	},
  	password: {
  		type: 'string',
  		required: true,
  		protected: true,
  		password: true
  	},
  	avatar: {
  		type: 'string',
  		defaultsTo: null
  	},
  	deleted: {
  		type: 'boolean',
  		protected: true,
  		defaultsTo: false
  	},
  	banned: {
  		type: 'boolean',
  		defaultsTo:false
  	},
  	admin: {
  		type: 'boolean',
  		defaultsTo: false
  	},
  	active: {
  		type: 'boolean',
  		defaultsTo: false
  	},
  	autoCreatedAt: true,
    // Add a reference to Users
    // streams: {
    //   collection: 'stream',
    //   via: 'user'
    // }
  },

  types: {
  	username: function(value) {
  		// string
  		// char min 3
  		// unique
  		return _.isString(value) && value.length >= 3
  	},
  	email: function (value) {
  		// string more than 6
  		// contain @ 
  		// contain .
  		return _.isString(value) && value.length >= 6 && value.includes('@') && value.includes('.')
  	},
	password: function(value) {
	  // For all creates/updates of `User` records that specify a value for an attribute
	  // which declares itself `type: 'password'`, that value must:
	  // • be a string
	  // • be at least 6 characters long
	  // • contain at least one number
	  // • contain at least one letter
	  return _.isString(value) && value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
	}
  },

  /*
  	event model
   */
   beforeCreate: (values, next) => {
   		console.log(':: beforeCreate event ', values)

   		// change password to hash password 
   		bcrypt.genSalt(10, (err, salt) => {
   			if(err) return next(err)
			bcrypt.hash(values.password, salt, function (err, hash) {
				if(err) return next(err)
				values.password = hash
   				return next()
			})
   		})

   },

	/*
		method
	*/

   comparePassword: (password, values, cb) => {
   		console.log(':: comparePassword ')
   		bcrypt.compare(password, values.password, (err, match) => {
			if(err) cb(err);
			if(match) {
				cb(null, true)
			} else {
				cb(err)
			}
   		})
   },

   signup: (inputs, cb) => {
   		return User.create({
   			name: inputs.name,
   			email: inputs.email,
   			password: inputs.password,
   			username: inputs.username
   		}).exec(cb)
   }
};

