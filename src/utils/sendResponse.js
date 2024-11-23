//send response
const sendResponse = async (res, statusCode, obj) => {
  res.status(statusCode).json(obj);
};
module.exports = sendResponse;
