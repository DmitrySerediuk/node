const catchError = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = catchError;
