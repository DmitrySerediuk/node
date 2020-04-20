const mongoose = require('mongoose');
const process = require('process');

const connectToDb = cb => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log("we're connected!");
    db.dropDatabase();
    cb();
  });
};

module.exports = connectToDb;
