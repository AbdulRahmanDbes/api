'use strict';

const Promise = require('bluebird')
const adminQuestionsRouter = require('express').Router();
const questionsService = require('../services/questions');
const authGuard = require('../middlewares/auth-admin-guard');
const errorHandling = require('../utils/error-handling');

adminQuestionsRouter.route('')
.get(authGuard('admin'), (req, res) => {
	return questionsService.getAllQuestions()
	.then(response => res.send(response))
	.catch(errorHandling.catchAndRespond(req, res));
})

module.exports = adminQuestionsRouter;