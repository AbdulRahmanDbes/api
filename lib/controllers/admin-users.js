'use strict';

const Promise = require('bluebird')
const adminUsersRouter = require('express').Router();
const userService = require('../services/users')
const authGuard = require('../middlewares/auth-admin-guard');
const errorHandling = require('../utils/error-handling');

adminUsersRouter.route('')
.get(authGuard('admin'), (req, res) => {
	return userService.listAllTypes()
	.then(response => res.send(response))
	.catch(errorHandling.catchAndRespond(req, res));
})

module.exports = adminUsersRouter;