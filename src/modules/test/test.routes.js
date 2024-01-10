const testRoutes = require('express').Router();
const {
    TestToken,
} = require('./test.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

testRoutes.get('/test/token', TestToken);

module.exports = testRoutes;