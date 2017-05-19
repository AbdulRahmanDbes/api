'use strict';

const jwt = require('../utils/jwt');
const log = require('../utils/logger');

const ROLE_ALIASES = {
    all_roles: 'user|admin|volunteer|translator'
}

function isProtected(req) {
    if (req.isProtected === false) {
        return false;
    } else {
        return true;
    }
}

function guard(role) {
    role = ROLE_ALIASES[role] || role
    let roles = role.split('|')
    return function(req, res, next) {
        let credentials = jwt.unbuild(req.headers['x-access-token']);
        if (credentials === null) {
            res.status(401).send('Access denied');
            return;
        }

        if (roles.indexOf(credentials.userType) !== -1) {
            req.userId = credentials.userId;
            req.authInfo = credentials.authInfo;
            req.userType = credentials.userType;
            next();
        } else {
            res.status(403).json({
                status: 403,
                message: 'Not authorized.',
            });
            return;
        }
    }
}

guard.set = function(auth, details) {
    return function(req, res, next) {
        req.isProtected = auth;
        next();
    }
}

module.exports = guard;