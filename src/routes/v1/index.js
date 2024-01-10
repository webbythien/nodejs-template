const allRoutes = require('express').Router();
const testRoutes = require('../../modules/test/test.routes');

allRoutes.use(testRoutes);

module.exports = allRoutes;
