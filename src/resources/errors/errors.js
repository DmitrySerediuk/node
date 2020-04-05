const ERROR = {
  NO_ERROR: { CODE: 200, MESSAGE: { status: 'success' } },
  NOT_FOUND: { CODE: 404, MESSAGE: { error: 'item not found' } },
  BAD_REQUEST: { CODE: 400, MESSAGE: { error: 'invalid parametrs' } }
};

module.exports = ERROR;
