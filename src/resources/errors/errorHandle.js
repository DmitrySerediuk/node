const errorHandle = (res, error) => {
  res.status(error.CODE).send(error.MESSAGE);
};

module.exports = errorHandle;
