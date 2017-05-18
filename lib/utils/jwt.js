'use strict';

const jwt = require('jsonwebtoken');
const log = require('./logger');

const jwtSecret = process.env.JWT_SECRET;

function getExpirationDate() {
  let date = Math.floor(new Date() / 1000) + (60 * 60 * 24 * 30);
  return date;
}

module.exports = {
  build(profile) {
    return jwt.sign({
      issuer: 'openembassy',
      userId: profile.userId,
      userType: profile.type,
      exp: getExpirationDate(),
    }, jwtSecret);
  },
  unbuild(token) {
    var decoded;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (e) {
      return null;
    }
    return decoded;
  }
};