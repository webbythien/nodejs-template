
const ResponseMessages = require('../../constants/responseMessages');
const { sendResponse, handleCustomError,jwt } = require('../../utils');

async function TestToken(req, res) {
    try {

        dataRes = jwt.createAccessToken({
            email:"thien",
            username:"admin",
        })
      const data = {
        token:dataRes
      }
      return sendResponse(res, 201, { ...data }, ResponseMessages.genericSuccess);
    } catch (err) {
        console.log(err)
      return handleCustomError(res, err);
    }
  }

  module.exports = {
    TestToken,
  };