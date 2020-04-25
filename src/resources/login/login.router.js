/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const loginService = require('./login.service');
const createError = require('http-errors');
const { FORBIDDEN, OK } = require('http-status-codes');
const catchError = require('../../common/catchError');

router.route('/').post(
  catchError(async (req, res) => {
    const jwtToken = await loginService.getJWTToken(req.body);
    if (!jwtToken) {
      throw new createError(FORBIDDEN, 'Forbidden');
    }
    req.headers.authorization = jwtToken;
    res.status(OK).json({ token: jwtToken });
  })
);

module.exports = router;
